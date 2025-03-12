import type { GitCommandResult } from "../../src/git/git.types.js";

import process from "node:process";

import semver from "semver";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { checkRequirements } from "../../src/check-requirements/index.js";
import * as runCommandSyncModule from "../../src/git/run-command-sync.js";

import { GIT_MIN_VERSION, REQUIRED_NODE_VERSIONS } from "../../src/check-requirements/constants.js";

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
      const formattedRequiredNodeVersions = REQUIRED_NODE_VERSIONS.replaceAll(
        /\^([.0-9]+)/gi,
        "$1+"
      ).replaceAll(" || ", " or ");
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
    const mockedGitVersion: GitCommandResult = {
      status: 0,
      stdout: "git version 2.30.0",
      stderr: ""
    };
    const coercedVersion = semver.coerce(mockedGitVersion.stdout);
    vi.spyOn(runCommandSyncModule, "runCommandSync").mockReturnValue(mockedGitVersion);
    checkRequirements();
    expect(console.error).toHaveBeenCalledWith(
      `[release-change]: Git version ${GIT_MIN_VERSION} required. Found ${coercedVersion}.`
    );
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
