import { runCommand } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { commit } from "../src/commit.js";

const mockedCommitterName = "mocked-committer-name [bot]";
const mockedCommitterEmail = "0+mocked-committer-name-bot@users.noreply.github.com";
const mockedCommitDescription = "chore(release): v1.0.0";
const mockedCommitDescriptionInMonorepo = "chore(release): @monorepo/a@v1.0.0";
const mockedCommitFooter = `Co-authored-by: ${mockedCommitterName} <${mockedCommitterEmail}>`;
const mockedCommitMessages = [
  mockedCommitDescription,
  mockedCommitDescriptionInMonorepo,
  `${mockedCommitDescription}\n\n${mockedCommitFooter}`,
  `${mockedCommitDescriptionInMonorepo}\n\n${mockedCommitFooter}`
];

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({
    runCommand: vi.fn()
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if the commit message is empty", async () => {
  await expect(commit("")).rejects.toThrowError("The commit message cannot be empty.");
});
it.each(mockedCommitMessages)(
  'should run the command with the commit message `"%s"` if correctly provided',
  async mockedCommitMessage => {
    const mockedCommand = vi
      .mocked(runCommand)
      .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
    await commit(mockedCommitMessage);
    expect(mockedCommand).toHaveBeenCalledWith("git", ["commit", "-m", mockedCommitMessage]);
  }
);
