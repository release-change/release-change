import type { SemVer } from "semver";

import childProcess from "node:child_process";
import process from "node:process";

import semver from "semver";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import checkRequirements, {
  isGitVersionCompatible,
  isNodeVersionCompatible
} from "../src/index.js";
import { GIT_MIN_VERSION } from "../src/utils/constants.js";

import packageManager from "../package.json" with { type: "json" };

const nodeVersionsRequired = packageManager.engines.node;

describe("incompatible Node version", () => {
  it("tests an outdated Node version", () => {
    expect(isNodeVersionCompatible("v16.20.2", nodeVersionsRequired)).toBe(false);
  });
  it("tests an odd Node version", () => {
    expect(isNodeVersionCompatible("v23.7.0", nodeVersionsRequired)).toBe(false);
  });
});

describe("compatible Node version", () => {
  it("tests a Node maintenance LTS version", () => {
    expect(isNodeVersionCompatible("v18.20.6", nodeVersionsRequired)).toBe(true);
  });
  it("tests a Node active LTS version", () => {
    expect(isNodeVersionCompatible("v20.18.2", nodeVersionsRequired)).toBe(true);
  });
  it("tests a Node current version (if even)", () => {
    expect(isNodeVersionCompatible("v22.13.1", nodeVersionsRequired)).toBe(true);
  });
});

describe("git version", () => {
  it("tests an incompatible git version", () => {
    expect(isGitVersionCompatible("2.7.1" as unknown as SemVer)).toBe(false);
  });
  it("tests a compatible git version", () => {
    expect(isGitVersionCompatible("2.48.1" as unknown as SemVer)).toBe(true);
  });
});

describe("check requirements", () => {
  type NodeRelease = {
    version: string;
    date: string;
    files: string[];
    npm: string;
    v8: string;
    uv: string;
    zlib: string;
    openssl: string;
    modules: string;
    lts: string | false;
    security: boolean;
  };
  type LTSRelease = {
    version: string;
    major: number;
  };
  type LTSReleases = Record<number, LTSRelease>;
  const nodeReleases: NodeRelease[] = JSON.parse(
    childProcess.execSync("curl -L https://nodejs.org/download/release/index.json", {
      encoding: "utf-8"
    })
  );
  const nodeLtsReleases = nodeReleases
    .filter(release => release.lts)
    .map(release => {
      return {
        version: release.version,
        major: semver.major(release.version)
      };
    });
  const formerLtsReleases = Object.values(
    nodeLtsReleases.reduce<LTSReleases>((acc, obj) => {
      acc[obj.major] ??= obj;
      if (acc[obj.major]?.version && semver.gt(obj.version, acc[obj.major]?.version as string))
        acc[obj.major] = obj;
      return acc;
    }, {})
  )
    .map(latest => latest.version)
    .slice(0, -3);
  let originalProcessExit: typeof process.exit;
  let originalConsoleError: typeof console.error;

  beforeEach(() => {
    originalProcessExit = process.exit;
    originalConsoleError = console.error;
    Object.defineProperty(process, "exit", {
      value: vi.fn(),
      configurable: true,
      writable: true
    });
    console.error = vi.fn();
  });

  afterEach(() => {
    process.exit = originalProcessExit;
    console.error = originalConsoleError;
    vi.restoreAllMocks();
  });

  it.each(formerLtsReleases)(
    "should call `process.exit(1)` and display an error message if Node version %s is not compatible with those required",
    mockedNodeVersion => {
      const formattedRequiredNodeVersions = packageManager.engines.node
        .replaceAll(/\^([.0-9]+)/gi, "$1+")
        .replaceAll(" || ", " or ");
      const foundVersion = mockedNodeVersion.replace("v", "");
      Object.defineProperty(process, "version", {
        value: mockedNodeVersion,
        configurable: true
      });
      checkRequirements();
      expect(console.error).toHaveBeenCalledWith(
        `[release-change]: Required one of the following Node versions: ${formattedRequiredNodeVersions}. Found ${foundVersion}.`
      );
      expect(process.exit).toHaveBeenCalledWith(1);
    }
  );

  it(`should call \`process.exit(1)\` and display an error message if git version is less than ${GIT_MIN_VERSION}`, () => {
    const mockedGitVersion = "git version 2.30.0";
    const coercedVersion = semver.coerce(mockedGitVersion);
    vi.spyOn(childProcess, "execSync").mockReturnValue(mockedGitVersion);
    checkRequirements();
    expect(console.error).toHaveBeenCalledWith(
      `[release-change]: Git version ${GIT_MIN_VERSION} required. Found ${coercedVersion}.`
    );
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
