import { formatDetailedError, runCommand } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { commit } from "../src/commit.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";

const mockedCommitterName = "mocked-committer-name [bot]";
const mockedCommitterEmail = "0+mocked-committer-name-bot@users.noreply.github.com";
const mockedCommitDescription = "chore: v1.0.0";
const mockedCommitDescriptionInMonorepo = "chore: @monorepo/a@v1.0.0";
const mockedCommitFooter = `Co-authored-by: ${mockedCommitterName} <${mockedCommitterEmail}>`;
const mockedCommitMessages = [
  mockedCommitDescription,
  mockedCommitDescriptionInMonorepo,
  `${mockedCommitDescription}\n\n${mockedCommitFooter}`,
  `${mockedCommitDescriptionInMonorepo}\n\n${mockedCommitFooter}`
];

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({
    formatDetailedError: vi.fn(),
    runCommand: vi.fn()
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if the commit message is empty", async () => {
  const expectedError = new Error(
    "Failed to run the `git commit` command: The commit message cannot be empty.",
    {
      cause: {
        title: "Failed to run the `git commit` command",
        message: "The commit message cannot be empty.",
        details: {
          output: "commitMessage: "
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  await expect(commit("", mockedCwd)).rejects.toThrowError(expectedError);
});
it.each(
  mockedCommitMessages
)('should run the command with the commit message `"%s"` if correctly provided', async mockedCommitMessage => {
  const mockedCommand = vi
    .mocked(runCommand)
    .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
  await commit(mockedCommitMessage, mockedCwd);
  expect(mockedCommand).toHaveBeenCalledWith("git", ["commit", "-m", mockedCommitMessage], {
    cwd: mockedCwd
  });
});
