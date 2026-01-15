import { setLogger } from "@release-change/logger";
import { formatDetailedError, runCommand } from "@release-change/shared";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { removeTagOnRemoteRepository } from "../src/index.js";
import { mockedContext } from "./fixtures/mocked-context.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

const mockedGitTags = ["v1.0.0", "@monorepo/a@v1.0.0"];

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({ formatDetailedError: vi.fn(), runCommand: vi.fn() }));
  vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});
afterEach(() => {
  vi.clearAllMocks();
});

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
  await expect(removeTagOnRemoteRepository("", mockedContext)).rejects.toThrowError(expectedError);
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
  it("should throw an error if the `git tag` command is run and fails", async () => {
    const expectedError = new Error(
      "Failed to run the `git` command: The command failed with status 128.",
      {
        cause: {
          title: "Failed to run the `git` command",
          message: "The command failed with status 128.",
          details: {
            output: "Some error message.",
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
    vi.mocked(formatDetailedError).mockReturnValue(expectedError);
    await expect(removeTagOnRemoteRepository(mockedGitTag, mockedContext)).rejects.toThrowError(
      expectedError
    );
    expect(mockedLogger.logError).toHaveBeenCalledWith(
      `Failed to remotely remove Git tag ${mockedGitTag} on origin.`
    );
  });
});
