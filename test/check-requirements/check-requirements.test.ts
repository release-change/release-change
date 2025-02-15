import type { SemVer } from "semver";

import childProcess from "node:child_process";
import process from "node:process";

import semver from "semver";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import checkRequirements from "../../src/check-requirements/index.js";
import isGitVersionCompatible from "../../src/check-requirements/is-git-version-compatible.js";
import isNodeVersionCompatible from "../../src/check-requirements/is-node-version-compatible.js";

import { GIT_MIN_VERSION } from "../../src/check-requirements/constants.js";

import packageManager from "../../package.json" with { type: "json" };

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
  it("tests an incompatible Git version", () => {
    expect(isGitVersionCompatible("2.7.1" as unknown as SemVer)).toBe(false);
  });
  it("tests a compatible Git version", () => {
    expect(isGitVersionCompatible("2.48.1" as unknown as SemVer)).toBe(true);
  });
});

describe("check requirements", () => {
  const formerLtsReleases = [
    "4.9.1",
    "6.17.1",
    "8.17.0",
    "10.24.1",
    "12.22.12",
    "14.21.3",
    "16.20.2"
  ];
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
      Object.defineProperty(process, "version", {
        value: mockedNodeVersion,
        configurable: true
      });
      checkRequirements();
      expect(console.error).toHaveBeenCalledWith(
        `[release-change]: Required one of the following Node versions: ${formattedRequiredNodeVersions}. Found ${mockedNodeVersion}.`
      );
      expect(process.exit).toHaveBeenCalledWith(1);
    }
  );

  it(`should call \`process.exit(1)\` and display an error message if Git version is less than ${GIT_MIN_VERSION}`, () => {
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
