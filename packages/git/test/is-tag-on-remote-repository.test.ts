import { setLogger } from "@release-change/logger";
import {
  formatDetailedError,
  formatOutputFromCommandResult,
  runCommand
} from "@release-change/shared";
import { describe, expect, it, vi } from "vitest";

import { isTagOnRemoteRepository } from "../src/index.js";
import { mockedContext } from "./fixtures/mocked-context.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

const mockedGitTags = ["v1.2.3", "@monorepo/a@v1.2.3"];

vi.mock("@release-change/shared", () => ({
  formatDetailedError: vi.fn(),
  formatOutputFromCommandResult: vi.fn(),
  runCommand: vi.fn()
}));
vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
vi.mocked(setLogger).mockReturnValue(mockedLogger);

it("should throw an error if the Git tag name is empty", async () => {
  const expectedError = new Error(
    "Failed to remove a Git tag on remote repository: The tag name must not be empty.",
    {
      cause: {
        title: "Failed to check a Git tag on remote repository",
        message: "The Git tag name must not be empty.",
        details: {
          output: "gitTag: "
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  await expect(isTagOnRemoteRepository("", mockedContext)).rejects.toThrow(expectedError);
});
describe.each(mockedGitTags)("for %s", mockedGitTag => {
  it("should throw an error if the `git ls-remote --tags` command is run and fails", async () => {
    const expectedOutput = "status: 128\n\nstdout: \n\nstderr: Some error message.";
    const expectedError = new Error(
      "Failed to run the `git ls-remote --tags` command: The command failed with status 128.",
      {
        cause: {
          title: "Failed to run the `git ls-remote --tags` command",
          message: "The command failed with status 128.",
          details: {
            output: expectedOutput,
            command: `git ls-remote --tags --exit-code origin ${mockedGitTag}`
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
    await expect(isTagOnRemoteRepository(mockedGitTag, mockedContext)).rejects.toThrow(
      expectedError
    );
    expect(mockedLogger.logError).toHaveBeenCalledWith(
      `Failed to check remote Git tag ${mockedGitTag} on origin.`
    );
  });
  it("should return `true` if the Git tag exists on remote repository", async () => {
    const mockedCommand = vi.mocked(runCommand).mockResolvedValue({
      status: 0,
      stdout: `abcdef123456 refs/heads/${mockedGitTag}`,
      stderr: ""
    });
    await isTagOnRemoteRepository(mockedGitTag, mockedContext);
    expect(mockedCommand).toHaveBeenCalledWith(
      "git",
      ["ls-remote", "--tags", "--exit-code", "origin", mockedGitTag],
      { cwd: mockedContext.cwd }
    );
    expect(mockedLogger.logInfo).toHaveBeenCalledWith(
      `Git tag ${mockedGitTag} found on remote repository.`
    );
  });
  it("should return `false` if the Git tag exists on remote repository", async () => {
    const mockedCommand = vi
      .mocked(runCommand)
      .mockResolvedValue({ status: 2, stdout: "", stderr: "" });
    await isTagOnRemoteRepository(mockedGitTag, mockedContext);
    expect(mockedCommand).toHaveBeenCalledWith(
      "git",
      ["ls-remote", "--tags", "--exit-code", "origin", mockedGitTag],
      { cwd: mockedContext.cwd }
    );
    expect(mockedLogger.logInfo).toHaveBeenCalledWith(
      `Git tag ${mockedGitTag} not found on remote repository.`
    );
  });
});
