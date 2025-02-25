import type { Context } from "../../src/cli/cli.types.js";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { checkAuthorisation } from "../../src/git/check-authorisation.js";

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
    repositoryUrl: mockedRepositoryUrl
  };
  const mockedContext = {
    cwd: "/fake/path",
    env: {},
    config: mockedConfig,
    logger: {
      logDebug: vi.fn(),
      logInfo: vi.fn(),
      logError: vi.fn(),
      logWarn: vi.fn(),
      logSuccess: vi.fn()
    }
  } as Context;
  const mockedContextWithBranch = { ...mockedContext, branch: "main" };

  beforeEach(() => {
    vi.mock("node:child_process");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should skip authorisation checking when the branch is not one of those from which th CLI is configures to publish", async () => {
    const expectedSkipLogMessage = "Skipping authorisation checking";
    await checkAuthorisation(mockedRepositoryUrl, mockedContext);
    expect(mockedContext.logger?.logInfo).toHaveBeenCalledWith(expectedSkipLogMessage);
  });
  it("should not catch any errors when the Git command does not fail", async () => {
    await checkAuthorisation(mockedRepositoryUrl, mockedContextWithBranch);
    expect(mockedContext.logger?.logError).not.toHaveBeenCalled();
  });
  it("should call `logDebug()` when the Git command does not fail and on debug mode", async () => {
    mockedConfig.debug = true;
    await checkAuthorisation(mockedRepositoryUrl, {
      ...mockedContextWithBranch,
      config: mockedConfig
    });
    expect(mockedContext.logger?.logDebug).toHaveBeenCalled();
  });
});
