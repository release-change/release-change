import { assert, it } from "vitest";

import { parseCommit } from "../src/index.js";
import { mockedContext, mockedContextInMonorepo } from "./fixtures/mocked-context.js";

const commitIndent = " ".repeat(4);
const commitId = "commit 0123456789abcdef";
const commitAuthor = "Author: Contributor <0+userId@users.noreply.github.com>";
const commitDate = "Date:   Wed Jan 1 13:37:42 2025 +0000";
const commitMessage = `${commitIndent}docs: some description`;
const commitBody = `${commitIndent}Some text.\n\n${commitIndent}Another text.`;
const commitSplitBody = ["Some text.", "Another text."];
const commitKeyValueFooter = `${commitIndent}Footer-key: value`;
const commitBreakingChangeFooter = `${commitIndent}BREAKING CHANGE: some explanation.`;
const sha = commitId.replace("commit ", "");
const message = commitMessage.trim();
const keyValueFooter = commitKeyValueFooter.trim();
const breakingChangeFooter = commitBreakingChangeFooter.trim();
const modifiedFile = "packages/a/src/some-file.ts";
const mockedCommitSample = `${commitId}\n${commitAuthor}\n${commitDate}\n\n${commitMessage}`;
const mockedCommitSampleWithBody = `${commitId}\n${commitAuthor}\n${commitDate}\n\n${commitMessage}\n\n${commitBody}`;
const mockedCommits = [
  {
    type: "commit with just a message",
    commit: mockedCommitSample,
    expected: {
      sha,
      message,
      body: [],
      footer: []
    }
  },
  {
    type: "commit with a message and a key/value footer",
    commit: `${mockedCommitSample}\n${commitIndent}\n${commitKeyValueFooter}`,
    expected: {
      sha,
      message,
      body: [],
      footer: [keyValueFooter]
    }
  },
  {
    type: "commit with a message and a breaking change footer",
    commit: `${mockedCommitSample}\n${commitIndent}\n${commitBreakingChangeFooter}`,
    expected: {
      sha,
      message,
      body: [],
      footer: [breakingChangeFooter]
    }
  },
  {
    type: "commit with a message and both footers",
    commit: `${mockedCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}`,
    expected: {
      sha,
      message,
      body: [],
      footer: [keyValueFooter, breakingChangeFooter]
    }
  },
  {
    type: "commit with just a message and a body",
    commit: mockedCommitSampleWithBody,
    expected: {
      sha,
      message,
      body: commitSplitBody,
      footer: []
    }
  },
  {
    type: "commit with a message, a body and a key/value footer",
    commit: `${mockedCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}`,
    expected: {
      sha,
      message,
      body: commitSplitBody,
      footer: [keyValueFooter]
    }
  },
  {
    type: "commit with a message, a body and a breaking change footer",
    commit: `${mockedCommitSampleWithBody}\n${commitIndent}\n${commitBreakingChangeFooter}`,
    expected: {
      sha,
      message,
      body: commitSplitBody,
      footer: [breakingChangeFooter]
    }
  },
  {
    type: "commit with a message, a body and both footers",
    commit: `${mockedCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}`,
    expected: {
      sha,
      message,
      body: commitSplitBody,
      footer: [keyValueFooter, breakingChangeFooter]
    }
  }
];
const mockedCommitsInMonorepo = [
  {
    type: "commit with just a message",
    commit: `${mockedCommitSample}\n\n${modifiedFile}`,
    expected: {
      sha,
      message,
      body: [],
      footer: [],
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a message and a key/value footer",
    commit: `${mockedCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n\n${modifiedFile}`,
    expected: {
      sha,
      message,
      body: [],
      footer: [keyValueFooter],
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a message and a breaking change footer",
    commit: `${mockedCommitSample}\n${commitIndent}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      sha,
      message,
      body: [],
      footer: [breakingChangeFooter],
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a message and both footers",
    commit: `${mockedCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      sha,
      message,
      body: [],
      footer: [keyValueFooter, breakingChangeFooter],
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with just a message and a body",
    commit: `${mockedCommitSampleWithBody}\n\n${modifiedFile}`,
    expected: {
      sha,
      message,
      body: commitSplitBody,
      footer: [],
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a message, a body and a key/value footer",
    commit: `${mockedCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n\n${modifiedFile}`,
    expected: {
      sha,
      message,
      body: commitSplitBody,
      footer: [keyValueFooter],
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a message, a body and a breaking change footer",
    commit: `${mockedCommitSampleWithBody}\n${commitIndent}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      sha,
      message,
      body: commitSplitBody,
      footer: [breakingChangeFooter],
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a message, a body and both footers",
    commit: `${mockedCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      sha,
      message,
      body: commitSplitBody,
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
