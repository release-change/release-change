import { setLogger } from "@release-change/logger";
import {
  formatDetailedError,
  formatOutputFromCommandResult,
  runCommand
} from "@release-change/shared";
import { describe, expect, it, vi } from "vitest";

import { removeTagOnRemoteRepository } from "../src/index.js";
import { mockedContext } from "./fixtures/mocked-context.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

const mockedGitTags = ["v1.0.0", "@monorepo/a@v1.0.0"];

vi.mock("@release-change/shared", () => ({
  formatDetailedError: vi.fn(),
  formatOutputFromCommandResult: vi.fn(),
  runCommand: vi.fn()
}));
vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
vi.mocked(setLogger).mockReturnValue(mockedLogger);

it("should throw an error if the Git tag is empty", async () => {
  const expectedError = new Error(
    "Failed to remove a Git tag on remote repository: The Git tag must not be empty.",
    {
      cause: {
        title: "Failed to remove a Git tag on remote repository",
        message: "The Git tag must not be empty.",
        details: {
          output: "gitTag: "
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  await expect(removeTagOnRemoteRepository("", mockedContext)).rejects.toThrow(expectedError);
});
describe.each(mockedGitTags)("for Git tag %s", mockedGitTag => {
  it("should run the `git push --delete` command", async () => {
    const mockedCommand = vi
      .mocked(runCommand)
      .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
    await removeTagOnRemoteRepository(mockedGitTag, mockedContext);
    expect(mockedCommand).toHaveBeenCalledWith("git", ["push", "--delete", "origin", mockedGitTag]);
    expect(mockedLogger.logInfo).toHaveBeenCalledWith(
      `Removed remote Git tag ${mockedGitTag} successfully.`
    );
  });
  it("should throw an error if the `git push` command is run and fails", async () => {
    const expectedOutput = "status: 128\n\nstdout: \n\nstderr: Some error message.";
    const expectedError = new Error(
      "Failed to run the `git push` command: The command failed with status 128.",
      {
        cause: {
          title: "Failed to run the `git push` command",
          message: "The command failed with status 128.",
          details: {
            output: expectedOutput,
            command: `git push --delete origin ${mockedGitTag}`
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
    await expect(removeTagOnRemoteRepository(mockedGitTag, mockedContext)).rejects.toThrow(
      expectedError
    );
    expect(mockedLogger.logError).toHaveBeenCalledWith(
      `Failed to remotely remove Git tag ${mockedGitTag} on origin.`
    );
  });
});
