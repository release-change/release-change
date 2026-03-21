import { setLogger } from "@release-change/logger";
import {
  formatDetailedError,
  formatOutputFromCommandResult,
  runCommand
} from "@release-change/shared";
import { expect, it, vi } from "vitest";

import { checkAuthorisation } from "../src/check-authorisation.js";
import { mockedConfig } from "./fixtures/mocked-config.js";
import { mockedContext, mockedContextWithEligibleBranch } from "./fixtures/mocked-context.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedRepositoryUrl } from "./fixtures/mocked-repository-url.js";

vi.mock("@release-change/logger", () => ({
  checkErrorType: vi.fn(),
  setLogger: vi.fn()
}));
vi.mock("@release-change/shared", () => ({
  deepInspectObject: vi.fn(),
  formatDetailedError: vi.fn(),
  formatOutputFromCommandResult: vi.fn(),
  runCommand: vi.fn(),
  WORKSPACE_NAME: "release-change"
}));
vi.mocked(setLogger).mockReturnValue(mockedLogger);

it("should skip authorisation checking when the branch is not one of those from which the CLI is configured to publish", async () => {
  const expectedSkipLogMessage = "Skipping authorisation checking.";
  await checkAuthorisation(mockedRepositoryUrl, mockedContext);
  expect(mockedLogger.logInfo).toHaveBeenCalledWith(expectedSkipLogMessage);
});
it("should throw an error when the Git command fails", async () => {
  const expectedOutput = "status: 128\n\nstdout: \n\nstderr: Error";
  const expectedError = new Error(
    "Failed to run the `git push` command: The command failed with status 128.",
    {
      cause: {
        title: "Failed to run the `git push` command",
        message: "The command failed with status 128.",
        details: {
          output: expectedOutput,
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
  vi.mocked(formatOutputFromCommandResult).mockReturnValue(expectedOutput);
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(checkAuthorisation(mockedRepositoryUrl, mockedContextWithEligibleBranch)).rejects.toThrow(
    expectedError
  );
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
