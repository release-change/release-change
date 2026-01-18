import { formatDetailedError, runCommand } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { push } from "../src/push.js";
import { mockedContext, mockedContextWithUndefinedBranchName } from "./fixtures/mocked-context.js";

const mockedDestinationBranch = "release-change/main/1.0.0";

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({
    formatDetailedError: vi.fn(),
    runCommand: vi.fn()
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if the branch name is not defined", () => {
  const expectedError = new Error(
    "Failed to run the `git push` command: A branch name must be provided.",
    {
      cause: {
        title: "Failed to run the `git push` command",
        message: "A branch name must be provided.",
        details: {
          output: "destinationBranch: "
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(
    push(mockedContextWithUndefinedBranchName, { destinationBranch: "" })
  ).rejects.toThrowError("A branch name must be provided.");
});
it("should throw an error if the `git push` command fails", () => {
  const expectedError = new Error(
    "Failed to run the `git push` command: The command failed with status 1.",
    {
      cause: {
        title: "Failed to run the `git push` command",
        message: "The command failed with status 1.",
        details: {
          output: "remote: error: GH013: Repository rule violations found for refs/heads/main.",
          command: "git push origin branch-name"
        }
      }
    }
  );
  vi.mocked(runCommand).mockResolvedValue({
    status: 1,
    stdout: "",
    stderr: "remote: error: GH013: Repository rule violations found for refs/heads/main."
  });
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(push(mockedContext, { destinationBranch: mockedDestinationBranch })).rejects.toThrowError(
    expectedError
  );
});
it("should run `git push` command when the branch name is defined", async () => {
  const mockedCommand = vi
    .mocked(runCommand)
    .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
  await push(mockedContext, { destinationBranch: mockedDestinationBranch });
  expect(mockedCommand).toHaveBeenCalledWith("git", ["push", "origin", mockedDestinationBranch]);
});
it("should run `git push` command with the `--follow-tags` option when tags must be included", async () => {
  const mockedCommand = vi
    .mocked(runCommand)
    .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
  await push(mockedContext, { destinationBranch: mockedDestinationBranch, includeTags: true });
  expect(mockedCommand).toHaveBeenCalledWith("git", [
    "push",
    "--follow-tags",
    "origin",
    mockedDestinationBranch
  ]);
});
