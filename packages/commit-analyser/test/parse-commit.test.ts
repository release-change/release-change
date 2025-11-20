import { formatDetailedError } from "@release-change/shared";
import { afterEach, assert, beforeEach, expect, it, vi } from "vitest";

import { parseCommit } from "../src/index.js";
import {
  commitAuthor,
  commitDate,
  commitId,
  commitIndent,
  commitKeyValueFooter,
  commitMessage,
  mockedCommitSample,
  mockedCommits,
  mockedCommitsInMonorepo
} from "./fixtures/mocked-commits.js";
import { mockedContext, mockedContextInMonorepo } from "./fixtures/mocked-context.js";

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({
    formatDetailedError: vi.fn(),
    WORKSPACE_NAME: "release-change"
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it.each(mockedCommits)("should parse a commit ($type)", ({ commit, expected }) => {
  assert.deepEqual(parseCommit(commit, mockedContext), expected);
});
it.each(mockedCommitsInMonorepo)("should parse a commit ($type) in a monorepo context", ({
  commit,
  expected
}) => {
  assert.deepEqual(parseCommit(commit, mockedContextInMonorepo), expected);
});
it("should throw an error if the commit has no header", () => {
  const expectedError = new Error("Failed to parse commit: No header found.", {
    cause: {
      title: "Failed to parse commit",
      message: "No header found.",
      details: {
        output: "commitHeader: undefined"
      }
    }
  });
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() => parseCommit("", mockedContext)).toThrowError(expectedError);
});
it("should throw an error if the commit has no message", () => {
  const expectedError = new Error("Failed to parse commit: No message found.", {
    cause: {
      title: "Failed to parse commit",
      message: "No message found.",
      details: {
        output: "commitMessage: undefined"
      }
    }
  });
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() =>
    parseCommit(`${commitId}\n${commitAuthor}\n${commitDate}`, mockedContext)
  ).toThrowError(expectedError);
});
it("should throw an error if the commit has no modified files in a monorepo context", () => {
  const expectedError = new Error(
    "Failed to parse commit: No modified files found while this repository is a monorepo.",
    {
      cause: {
        title: "Failed to parse commit",
        message: "No modified files found while this repository is a monorepo.",
        details: {
          output: "commitModifiedFiles.length: 0"
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() =>
    parseCommit(
      `${mockedCommitSample}\n${commitIndent}\n${commitKeyValueFooter}`,
      mockedContextInMonorepo
    )
  ).toThrowError(expectedError);
});
it("should not throw an error if the commit has no modified files in a monorepo context, but is a merge commit", () => {
  assert.doesNotThrow(
    () =>
      parseCommit(
        `${commitId}\nMerge: 0123456 0123456\n${commitAuthor}\n${commitDate}\n\n${commitMessage}\n${commitIndent}\n${commitKeyValueFooter}`,
        mockedContextInMonorepo
      ),
    "Failed to parse commit: no modified files found while this repository is a monorepo."
  );
});
