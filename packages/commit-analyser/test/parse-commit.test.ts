import { assert, it } from "vitest";

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

it.each(mockedCommits)("should parse a commit ($type)", ({ commit, expected }) => {
  assert.deepEqual(parseCommit(commit, mockedContext), expected);
});
it.each(mockedCommitsInMonorepo)(
  "should parse a commit ($type) in a monorepo context",
  ({ commit, expected }) => {
    assert.deepEqual(parseCommit(commit, mockedContextInMonorepo), expected);
  }
);
it("should throw an error if the commit has no header", () => {
  assert.throws(() => parseCommit("", mockedContext), "Failed to parse commit: no header found.");
});
it("should throw an error if the commit has no message", () => {
  assert.throws(
    () => parseCommit(`${commitId}\n${commitAuthor}\n${commitDate}`, mockedContext),
    "Failed to parse commit: no message found."
  );
});
it("should throw an error if the commit has no modified files in a monorepo context", () => {
  assert.throws(
    () =>
      parseCommit(
        `${mockedCommitSample}\n${commitIndent}\n${commitKeyValueFooter}`,
        mockedContextInMonorepo
      ),
    "Failed to parse commit: no modified files found while this repository is a monorepo."
  );
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
