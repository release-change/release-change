import type { Context } from "../../src/cli/cli.types.js";
import type { Logger } from "../../src/logger/logger.types.js";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { checkAuthorisation } from "../../src/git/check-authorisation.js";
import { runCommand } from "../../src/git/run-command.js";
import * as setLoggerModule from "../../src/logger/set-logger.js";

describe("check authorisation", () => {
  const mockedRepositoryUrl = "https://github.com/user-id/repo-name";
  const mockedConfig = {
    branches: ["main"],
    releaseType: {
      main: {
        channel: "latest"
      }
    },
    debug: false,
    dryRun: false,
    repositoryUrl: mockedRepositoryUrl,
    remoteName: "origin"
  };
  const mockedContext = {
    cwd: "/fake/path",
    env: {},
    branch: "branch-name",
    ci: {
      isCi: true,
      isPullRequest: false
    },
    config: mockedConfig
  } as Context;
  const mockedContextWithEligibleBranch = { ...mockedContext, branch: "main" };
  const mockedLogger: Logger = {
    setDebugScope: vi.fn(),
    logDebug: vi.fn(),
    logInfo: vi.fn(),
    logError: vi.fn(),
    logWarn: vi.fn(),
    logSuccess: vi.fn()
  };

  beforeEach(() => {
    vi.spyOn(setLoggerModule, "setLogger").mockReturnValue(mockedLogger);
    vi.mock("../../src/git/run-command.js");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should skip authorisation checking when the branch is not one of those from which the CLI is configured to publish", async () => {
    const expectedSkipLogMessage = "Skipping authorisation checking";
    await checkAuthorisation(mockedRepositoryUrl, mockedContext);
    expect(mockedLogger.logInfo).toHaveBeenCalledWith(expectedSkipLogMessage);
  });
  it("should not catch any errors when the Git command does not fail", async () => {
    vi.mocked(runCommand).mockReturnValue(
      Promise.resolve({
        status: 0,
        stdout: "",
        stderr: ""
      })
    );
    await checkAuthorisation(mockedRepositoryUrl, mockedContextWithEligibleBranch);
    expect(mockedLogger.logError).not.toHaveBeenCalled();
  });
  it("should call `logDebug()` when the Git command does not fail and on debug mode", async () => {
    mockedConfig.debug = true;
    await checkAuthorisation(mockedRepositoryUrl, {
      ...mockedContextWithEligibleBranch,
      config: mockedConfig
    });
    expect(mockedLogger.logDebug).toHaveBeenCalled();
  });
});
