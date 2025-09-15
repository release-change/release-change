import type { CommandResult } from "@release-change/shared";

import process from "node:process";

import { setLogger } from "@release-change/logger";
import { coerce } from "@release-change/semver";
import { runCommandSync } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { checkRequirements } from "../../src/index.js";
import { mockedLogger } from "../fixtures/mocked-logger.js";

import { GIT_MIN_VERSION, REQUIRED_NODE_VERSIONS } from "../../src/check-requirements/constants.js";

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

beforeEach(() => {
  vi.mock("@release-change/logger", () => ({
    setLogger: vi.fn(),
    checkErrorType: vi.fn()
  }));
  vi.mock("@release-change/shared", () => ({
    runCommandSync: vi.fn(() => ({
      status: 0,
      stdout: "git version 2.48.1",
      stderr: ""
    })),
    ROOT_PACKAGE_MANIFEST: {
      engines: {
        node: "^20.18.3 || ^22.12.0",
        npm: ">=10.8.2",
        pnpm: ">=10.16.1"
      }
    },
    WORKSPACE_NAME: "release-change",
    WORKSPACE_VERSION: "0.0.0"
  }));
  vi.mock("../../src/cli/cli.js", () => ({
    cli: vi.fn(() => Promise.resolve(0))
  }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
  originalProcessExit = process.exit;
  process.exit = vi.fn((code?: number | string) => {
    throw new Error(`process.exit called with ${code}`);
  });
});

afterEach(() => {
  process.exit = originalProcessExit;
  vi.clearAllMocks();
  vi.resetAllMocks();
});

it.each(formerLtsReleases)(
  "should call `process.exit(1)` and display an error message if Node version %s is not compatible with those required",
  async mockedNodeVersion => {
    const formattedRequiredNodeVersions = new Intl.ListFormat("en-GB", {
      style: "long",
      type: "disjunction"
    }).format(REQUIRED_NODE_VERSIONS.replaceAll(/\^([.0-9]+)/gi, "$1+").split(" || "));
    Object.defineProperty(process, "version", {
      value: mockedNodeVersion,
      configurable: true
    });
    await expect(checkRequirements()).rejects.toThrow("process.exit called with 1");
    expect(mockedLogger.logError).toHaveBeenCalledWith(
      `Required one of the following Node versions: ${formattedRequiredNodeVersions}. Found ${mockedNodeVersion}.`
    );
  }
);
it(`should call \`process.exit(1)\` and display an error message if Git version is less than ${GIT_MIN_VERSION}`, async () => {
  Object.defineProperty(process, "version", {
    value: "v20.18.3",
    configurable: true
  });
  const mockedGitVersion: CommandResult = {
    status: 0,
    stdout: "git version 2.30.0",
    stderr: ""
  };
  const coercedVersion = coerce(mockedGitVersion.stdout);
  vi.mocked(runCommandSync).mockReturnValue(mockedGitVersion);
  await expect(checkRequirements()).rejects.toThrow("process.exit called with 1");
  expect(mockedLogger.logError).toHaveBeenCalledWith(
    `Git version ${GIT_MIN_VERSION} required. Found ${coercedVersion}.`
  );
});
it("should complete successfully when requirements are met", async () => {
  Object.defineProperty(process, "version", {
    value: "v20.18.3",
    configurable: true
  });
  await expect(checkRequirements()).resolves.not.toThrow();
});
