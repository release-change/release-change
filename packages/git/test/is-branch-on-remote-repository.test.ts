import { setLogger } from "@release-change/logger";
import {
  formatDetailedError,
  formatOutputFromCommandResult,
  runCommand
} from "@release-change/shared";
import { expect, it, vi } from "vitest";

import { isBranchOnRemoteRepository } from "../src/index.js";
import { mockedContext } from "./fixtures/mocked-context.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedReleaseBranch } from "./fixtures/mocked-release-branch.js";

vi.mock("@release-change/shared", () => ({
  formatDetailedError: vi.fn(),
  formatOutputFromCommandResult: vi.fn(),
  runCommand: vi.fn()
}));
vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
vi.mocked(setLogger).mockReturnValue(mockedLogger);

it("should throw an error if the branch name is empty", async () => {
  const expectedError = new Error(
    "Failed to check a branch on remote repository: The branch name must not be empty.",
    {
      cause: {
        title: "Failed to check a branch on remote repository",
        message: "The branch name must not be empty.",
        details: {
          output: "branch: "
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  await expect(isBranchOnRemoteRepository("", mockedContext)).rejects.toThrow(expectedError);
});
it("should throw an error if the `git ls-remote` command is run and fails", async () => {
  const expectedOutput = "status: 128\n\nstdout: \n\nstderr: Some error message.";
  const expectedError = new Error(
    "Failed to run the `git ls-remote` command: The command failed with status 128.",
    {
      cause: {
        title: "Failed to run the `git ls-remote` command",
        message: "The command failed with status 128.",
        details: {
          output: expectedOutput,
          command: `git ls-remote --exit-code -- origin refs/heads/${mockedReleaseBranch}`
        }
      }
    }
  );
  vi.mocked(runCommand).mockResolvedValue({
    status: 128,
    stdout: "",
    stderr: "Some error message."
  });
  vi.mocked(formatOutputFromCommandResult).mockReturnValue(expectedOutput);
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  await expect(isBranchOnRemoteRepository(mockedReleaseBranch, mockedContext)).rejects.toThrow(
    expectedError
  );
  expect(mockedLogger.logError).toHaveBeenCalledWith(
    `Failed to check remote branch ${mockedReleaseBranch} on origin.`
  );
});
it("should return `true` if the branch exists on remote repository", async () => {
  const mockedCommand = vi.mocked(runCommand).mockResolvedValue({
    status: 0,
    stdout: `abcdef123456 refs/heads/${mockedReleaseBranch}`,
    stderr: ""
  });
  await isBranchOnRemoteRepository(mockedReleaseBranch, mockedContext);
  expect(mockedCommand).toHaveBeenCalledWith(
    "git",
    ["ls-remote", "--exit-code", "--", "origin", `refs/heads/${mockedReleaseBranch}`],
    { cwd: mockedContext.cwd }
  );
  expect(mockedLogger.logInfo).toHaveBeenCalledWith(
    `Branch ${mockedReleaseBranch} found on remote repository.`
  );
});
it("should return `false` if the branch exists on remote repository", async () => {
  const mockedCommand = vi
    .mocked(runCommand)
    .mockResolvedValue({ status: 2, stdout: "", stderr: "" });
  await isBranchOnRemoteRepository(mockedReleaseBranch, mockedContext);
  expect(mockedCommand).toHaveBeenCalledWith(
    "git",
    ["ls-remote", "--exit-code", "--", "origin", `refs/heads/${mockedReleaseBranch}`],
    { cwd: mockedContext.cwd }
  );
  expect(mockedLogger.logInfo).toHaveBeenCalledWith(
    `Branch ${mockedReleaseBranch} not found on remote repository.`
  );
});
