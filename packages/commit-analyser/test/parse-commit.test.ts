import { assert, expect, it } from "vitest";

import { parseCommit } from "../src/parse-commit.js";
import { mockedContext, mockedContextInMonorepo } from "./fixtures/mocked-context.js";

const commitIndent = " ".repeat(4);
const commitId = "commit 0123456789abcdef";
const commitAuthor = "Author: Contributor <0+userId@users.noreply.github.com>";
const commitDate = "Date:   Wed Jan 1 13:37:42 2025 +0000";
const commitDescription = `${commitIndent}docs: some description`;
const commitBody = `${commitIndent}Some text for the commit body.`;
const commitKeyValueFooter = `${commitIndent}Footer-key: value`;
const commitBreakingChangeFooter = `${commitIndent}BREAKING CHANGE: some explanation.`;
const description = commitDescription.trim();
const keyValueFooter = commitKeyValueFooter.trim();
const breakingChangeFooter = commitBreakingChangeFooter.trim();
const modifiedFile = "packages/a/src/some-file.ts";
const mockedCommitSample = `${commitId}\n${commitAuthor}\n${commitDate}\n\n${commitDescription}`;
const mockedCommitSampleWithBody = `${commitId}\n${commitAuthor}\n${commitDate}\n\n${commitDescription}\n\n${commitBody}`;
const mockedCommits = [
  {
    type: "commit with just a description",
    commit: mockedCommitSample,
    expected: {
      description,
      footer: []
    }
  },
  {
    type: "commit with a description and a key/value footer",
    commit: `${mockedCommitSample}\n${commitIndent}\n${commitKeyValueFooter}`,
    expected: {
      description,
      footer: [keyValueFooter]
    }
  },
  {
    type: "commit with a description and a breaking change footer",
    commit: `${mockedCommitSample}\n${commitIndent}\n${commitBreakingChangeFooter}`,
    expected: {
      description,
      footer: [breakingChangeFooter]
    }
  },
  {
    type: "commit with a description and both footers",
    commit: `${mockedCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}`,
    expected: {
      description,
      footer: [keyValueFooter, breakingChangeFooter]
    }
  }
];
const mockedCommitsInMonorepo = [
  {
    type: "commit with just a description",
    commit: `${mockedCommitSample}\n\n${modifiedFile}`,
    expected: {
      description,
      footer: [],
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a description and a key/value footer",
    commit: `${mockedCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n\n${modifiedFile}`,
    expected: {
      description,
      footer: [keyValueFooter],
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a description and a breaking change footer",
    commit: `${mockedCommitSample}\n${commitIndent}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      description,
      footer: [breakingChangeFooter],
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a description and both footers",
    commit: `${mockedCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      description,
      footer: [keyValueFooter, breakingChangeFooter],
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with just a description and a body",
    commit: `${mockedCommitSampleWithBody}\n\n${modifiedFile}`,
    expected: {
      description,
      footer: [],
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a description, a body and a key/value footer",
    commit: `${mockedCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n\n${modifiedFile}`,
    expected: {
      description,
      footer: [keyValueFooter],
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a description, a body and a breaking change footer",
    commit: `${mockedCommitSampleWithBody}\n${commitIndent}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      description,
      footer: [breakingChangeFooter],
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a description, a body and both footers",
    commit: `${mockedCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      description,
      footer: [keyValueFooter, breakingChangeFooter],
      modifiedFiles: [modifiedFile]
    }
  }
];

it.each(mockedCommits)("should parse a commit ($type)", ({ commit, expected }) => {
  assert.deepEqual(parseCommit(commit, mockedContext), expected);
});
it.each(mockedCommitsInMonorepo)(
  "should parse a commit ($type) in a monorepo context",
  ({ commit, expected }) => {
    assert.deepEqual(parseCommit(commit, mockedContextInMonorepo), expected);
  }
);
it("should throw an error if the commit has no description", () => {
  expect(() =>
    parseCommit(`${commitId}\n${commitAuthor}\n${commitDate}`, mockedContext)
  ).toThrowError("Failed to parse commit: no description found.");
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
        `${commitId}\nMerge: 0123456 0123456\n${commitAuthor}\n${commitDate}\n\n${commitDescription}\n${commitIndent}\n${commitKeyValueFooter}`,
        mockedContextInMonorepo
      ),
    "Failed to parse commit: no modified files found while this repository is a monorepo."
  );
});
