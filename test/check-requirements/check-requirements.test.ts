import type { Logger } from "../../src/logger/logger.types.js";
import type { CommandResult } from "../../src/shared/shared.types.js";

import process from "node:process";
import semver from "semver";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { checkRequirements } from "../../src/check-requirements/check-requirements.js";
import * as setLoggerModule from "../../src/logger/set-logger.js";
import * as runCommandSyncModule from "../../src/shared/run-command-sync.js";

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
  const mockedLogger: Logger = {
    setDebugScope: vi.fn(),
    logDebug: vi.fn(),
    logInfo: vi.fn(),
    logError: vi.fn(),
    logWarn: vi.fn(),
    logSuccess: vi.fn()
  };
  let originalProcessExit: typeof process.exit;

  beforeEach(() => {
    vi.spyOn(setLoggerModule, "setLogger").mockReturnValue(mockedLogger);
    originalProcessExit = process.exit;
    Object.defineProperty(process, "exit", {
      value: vi.fn(),
      configurable: true,
      writable: true
    });
  });

  afterEach(() => {
    process.exit = originalProcessExit;
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
      expect(mockedLogger.logError).toHaveBeenCalledWith(
        `Required one of the following Node versions: ${formattedRequiredNodeVersions}. Found ${mockedNodeVersion}.`
      );
      expect(process.exit).toHaveBeenCalledWith(1);
    }
  );

  it(`should call \`process.exit(1)\` and display an error message if Git version is less than ${GIT_MIN_VERSION}`, () => {
    const mockedGitVersion: CommandResult = {
      status: 0,
      stdout: "git version 2.30.0",
      stderr: ""
    };
    const coercedVersion = semver.coerce(mockedGitVersion.stdout);
    vi.spyOn(runCommandSyncModule, "runCommandSync").mockReturnValue(mockedGitVersion);
    checkRequirements();
    expect(mockedLogger.logError).toHaveBeenCalledWith(
      `Git version ${GIT_MIN_VERSION} required. Found ${coercedVersion}.`
    );
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
