import type { Context } from "../../src/cli/cli.types.js";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as checkAuthorisationModule from "../../src/git/check-authorisation.js";
import { checkPushPermissions } from "../../src/git/check-push-permissions.js";
import * as isBranchUpToDateModule from "../../src/git/is-branch-up-to-date.js";

describe("check permissions for push", () => {
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
    config: mockedConfig,
    logger: {
      logDebug: vi.fn(),
      logInfo: vi.fn(),
      logError: vi.fn(),
      logWarn: vi.fn(),
      logSuccess: vi.fn()
    }
  } as Context;
  const mockedContextWithEligibleBranch = { ...mockedContext, branch: "main" };

  beforeEach(() => {
    vi.mock("../../src/git/check-authorisation.js");
    vi.mock("../../src/git/is-branch-up-to-date.js");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should log a warning message when the local branch is not up to date", async () => {
    vi.mocked(isBranchUpToDateModule.isBranchUpToDate).mockReturnValue(Promise.resolve(false));
    await checkPushPermissions(mockedRepositoryUrl, mockedContextWithEligibleBranch);
    expect(mockedContext.logger.logWarn).toHaveBeenCalled();
  });
  it("should not log a warning message when the branch context is not one of those from which the CLI is configured to publish", async () => {
    vi.mocked(isBranchUpToDateModule.isBranchUpToDate).mockReturnValue(Promise.resolve(false));
    await checkPushPermissions(mockedRepositoryUrl, mockedContext);
    expect(mockedContext.logger.logWarn).not.toHaveBeenCalled();
  });
  it("should log a success message when push is allowed and the local branch up to date", async () => {
    vi.mocked(isBranchUpToDateModule.isBranchUpToDate).mockReturnValue(Promise.resolve(true));
    await checkPushPermissions(mockedRepositoryUrl, mockedContextWithEligibleBranch);
    expect(mockedContext.logger.logSuccess).toHaveBeenCalled();
  });
  it("should not log a success message when the branch context is not one of those from which the CLI is configured to publish", async () => {
    await checkPushPermissions(mockedRepositoryUrl, mockedContext);
    expect(mockedContext.logger.logSuccess).not.toHaveBeenCalled();
  });
  it("should log an error message when an error is thrown", async () => {
    vi.mocked(checkAuthorisationModule.checkAuthorisation).mockRejectedValue(
      new Error("Mocked error")
    );
    await checkPushPermissions(mockedRepositoryUrl, mockedContextWithEligibleBranch);
    expect(mockedContext.logger.logError).toHaveBeenCalled();
  });
});
