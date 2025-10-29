import { setLogger } from "@release-change/logger";
import { formatDetailedError, runCommand } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { checkAuthorisation } from "../src/check-authorisation.js";
import { mockedConfig } from "./fixtures/mocked-config.js";
import { mockedContext, mockedContextWithEligibleBranch } from "./fixtures/mocked-context.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedRepositoryUrl } from "./fixtures/mocked-repository-url.js";

beforeEach(() => {
  vi.mock("@release-change/logger", () => ({
    checkErrorType: vi.fn(),
    setLogger: vi.fn()
  }));
  vi.mock("@release-change/shared", () => ({
    formatDetailedError: vi.fn(),
    runCommand: vi.fn(),
    WORKSPACE_NAME: "release-change"
  }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should skip authorisation checking when the branch is not one of those from which the CLI is configured to publish", async () => {
  const expectedSkipLogMessage = "Skipping authorisation checking.";
  await checkAuthorisation(mockedRepositoryUrl, mockedContext);
  expect(mockedLogger.logInfo).toHaveBeenCalledWith(expectedSkipLogMessage);
});
it("should throw an error when the Git command fails", async () => {
  const expectedError = new Error(
    "Failed to run the `git` command: The command failed with status 128.",
    {
      cause: {
        title: "Failed to run the `git` command",
        message: "The command failed with status 128.",
        details: {
          output: "Error",
          command: `git push --dry-run --no-verify ${mockedRepositoryUrl} ${mockedContextWithEligibleBranch.branch}`
        }
      }
    }
  );
  vi.mocked(runCommand).mockReturnValue(
    Promise.resolve({
      status: 128,
      stdout: "",
      stderr: "Error"
    })
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  await expect(
    checkAuthorisation(mockedRepositoryUrl, mockedContextWithEligibleBranch)
  ).rejects.toThrowError(expectedError);
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
});
it("should call `logDebug()` when the Git command does not fail and on debug mode", async () => {
  mockedConfig.debug = true;
  await checkAuthorisation(mockedRepositoryUrl, {
    ...mockedContextWithEligibleBranch,
    config: mockedConfig
  });
  expect(mockedLogger.logDebug).toHaveBeenCalled();
});
