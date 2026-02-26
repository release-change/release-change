import { setLogger } from "@release-change/logger";
import { formatDetailedError, runCommand } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { deleteBranchOnRemoteRepository } from "../src/index.js";
import { mockedContext } from "./fixtures/mocked-context.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedReleaseBranch } from "./fixtures/mocked-release-branch.js";

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({ formatDetailedError: vi.fn(), runCommand: vi.fn() }));
  vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if the branch name is empty", async () => {
  const expectedError = new Error(
    "Failed to remove a branch on remote repository: The branch name must not be empty.",
    {
      cause: {
        title: "Failed to remove a branch on remote repository",
        message: "The branch name must not be empty.",
        details: {
          output: "branch: "
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(deleteBranchOnRemoteRepository("", mockedContext)).rejects.toThrowError(expectedError);
});
it("should run the `git push --delete` command", async () => {
  const mockedCommand = vi
    .mocked(runCommand)
    .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
  await deleteBranchOnRemoteRepository(mockedReleaseBranch, mockedContext);
  expect(mockedCommand).toHaveBeenCalledWith("git", [
    "push",
    "--delete",
    "origin",
    mockedReleaseBranch
  ]);
  expect(mockedLogger.logInfo).toHaveBeenCalledWith(
    `Deleted remote branch ${mockedReleaseBranch} successfully.`
  );
});
it("should throw an error if the `git push` command is run and fails", async () => {
  const expectedError = new Error(
    "Failed to run the `git push` command: The command failed with status 128.",
    {
      cause: {
        title: "Failed to run the `git push` command",
        message: "The command failed with status 128.",
        details: {
          output: "Some error message.",
          command: `git push --delete origin ${mockedReleaseBranch}`
        }
      }
    }
  );
  vi.mocked(runCommand).mockResolvedValue({
    status: 128,
    stdout: "",
    stderr: "Some error message."
  });
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  await expect(
    deleteBranchOnRemoteRepository(mockedReleaseBranch, mockedContext)
  ).rejects.toThrowError(expectedError);
  expect(mockedLogger.logError).toHaveBeenCalledWith(
    `Failed to remotely delete branch ${mockedReleaseBranch} on origin.`
  );
});
