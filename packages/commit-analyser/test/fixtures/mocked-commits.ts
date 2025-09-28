import type { Commit } from "@release-change/shared";

export const commitIndent = " ".repeat(4);
export const commitId = "commit 0123456789abcdef";
const commitMerge = "Merge: 0123456 0123456";
export const commitAuthor = "Author: Contributor <0+userId@users.noreply.github.com>";
export const commitDate = "Date:   Wed Jan 1 13:37:42 2025 +0000";
export const commitMessage = `${commitIndent}docs: some description`;
export const commitMajorMessage = `${commitIndent}docs!: some description`;
export const commitMinorMessage = `${commitIndent}feat: some description`;
export const commitPatchMessage = `${commitIndent}fix: some description`;
const commitBody = `${commitIndent}Some text.\n\n${commitIndent}Another text.`;
export const commitSplitBody = ["Some text.", "Another text."];
export const commitKeyValueFooter = `${commitIndent}Footer-key: value`;
export const commitBreakingChangeFooter = `${commitIndent}BREAKING CHANGE: some explanation.`;
export const sha = commitId.replace("commit ", "");
export const message = commitMessage.trim();
export const majorMessage = commitMajorMessage.trim();
export const minorMessage = commitMinorMessage.trim();
export const patchMessage = commitPatchMessage.trim();
export const keyValueFooter = commitKeyValueFooter.trim();
export const breakingChangeFooter = commitBreakingChangeFooter.trim();
export const modifiedFile = "packages/a/src/some-file.ts";
export const mockedCommitSample = `${commitId}\n${commitAuthor}\n${commitDate}\n\n${commitMessage}`;
export const mockedCommitSampleWithBody = `${commitId}\n${commitAuthor}\n${commitDate}\n\n${commitMessage}\n\n${commitBody}`;
export const mockedMajorCommitSample = `${commitId}\n${commitAuthor}\n${commitDate}\n\n${commitMajorMessage}`;
export const mockedMajorCommitSampleWithBody = `${commitId}\n${commitAuthor}\n${commitDate}\n\n${commitMajorMessage}\n\n${commitBody}`;
export const mockedMinorCommitSample = `${commitId}\n${commitAuthor}\n${commitDate}\n\n${commitMinorMessage}`;
export const mockedMinorCommitSampleWithBody = `${commitId}\n${commitAuthor}\n${commitDate}\n\n${commitMinorMessage}\n\n${commitBody}`;
export const mockedPatchCommitSample = `${commitId}\n${commitAuthor}\n${commitDate}\n\n${commitPatchMessage}`;
export const mockedPatchCommitSampleWithBody = `${commitId}\n${commitAuthor}\n${commitDate}\n\n${commitPatchMessage}\n\n${commitBody}`;
export const mockedMergeCommitSample = `${commitId}\n${commitMerge}\n${commitAuthor}\n${commitDate}\n\n${commitMessage}`;
export const mockedMergeCommitSampleWithBody = `${commitId}\n${commitMerge}\n${commitAuthor}\n${commitDate}\n\n${commitMessage}\n\n${commitBody}`;
export const mockedMajorMergeCommitSample = `${commitId}\n${commitMerge}\n${commitAuthor}\n${commitDate}\n\n${commitMajorMessage}`;
export const mockedMajorMergeCommitSampleWithBody = `${commitId}\n${commitMerge}\n${commitAuthor}\n${commitDate}\n\n${commitMajorMessage}\n\n${commitBody}`;
export const mockedMinorMergeCommitSample = `${commitId}\n${commitMerge}\n${commitAuthor}\n${commitDate}\n\n${commitMinorMessage}`;
export const mockedMinorMergeCommitSampleWithBody = `${commitId}\n${commitMerge}\n${commitAuthor}\n${commitDate}\n\n${commitMinorMessage}\n\n${commitBody}`;
export const mockedPatchMergeCommitSample = `${commitId}\n${commitMerge}\n${commitAuthor}\n${commitDate}\n\n${commitPatchMessage}`;
export const mockedPatchMergeCommitSampleWithBody = `${commitId}\n${commitMerge}\n${commitAuthor}\n${commitDate}\n\n${commitPatchMessage}\n\n${commitBody}`;
export const mockedCommits: { type: string; commit: string; expected: Commit }[] = [
  {
    type: "commit with just a message",
    commit: mockedCommitSample,
    expected: {
      isMergeCommit: false,
      sha,
      message,
      body: [],
      footer: [],
      releaseType: null
    }
  },
  {
    type: "commit with a message and a key/value footer",
    commit: `${mockedCommitSample}\n${commitIndent}\n${commitKeyValueFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message,
      body: [],
      footer: [keyValueFooter],
      releaseType: null
    }
  },
  {
    type: "commit with a message and a breaking change footer",
    commit: `${mockedCommitSample}\n${commitIndent}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message,
      body: [],
      footer: [breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "commit with a message and both footers",
    commit: `${mockedCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message,
      body: [],
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "commit with just a message and a body",
    commit: mockedCommitSampleWithBody,
    expected: {
      isMergeCommit: false,
      sha,
      message,
      body: commitSplitBody,
      footer: [],
      releaseType: null
    }
  },
  {
    type: "commit with a message, a body and a key/value footer",
    commit: `${mockedCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message,
      body: commitSplitBody,
      footer: [keyValueFooter],
      releaseType: null
    }
  },
  {
    type: "commit with a message, a body and a breaking change footer",
    commit: `${mockedCommitSampleWithBody}\n${commitIndent}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message,
      body: commitSplitBody,
      footer: [breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "commit with a message, a body and both footers",
    commit: `${mockedCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message,
      body: commitSplitBody,
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "merge commit with just a message",
    commit: mockedMergeCommitSample,
    expected: {
      isMergeCommit: true,
      sha,
      message,
      body: [],
      footer: [],
      releaseType: null
    }
  },
  {
    type: "merge commit with a message and a key/value footer",
    commit: `${mockedMergeCommitSample}\n${commitIndent}\n${commitKeyValueFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message,
      body: [],
      footer: [keyValueFooter],
      releaseType: null
    }
  },
  {
    type: "merge commit with a message and a breaking change footer",
    commit: `${mockedMergeCommitSample}\n${commitIndent}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message,
      body: [],
      footer: [breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "merge commit with a message and both footers",
    commit: `${mockedMergeCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message,
      body: [],
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "merge commit with just a message and a body",
    commit: mockedMergeCommitSampleWithBody,
    expected: {
      isMergeCommit: true,
      sha,
      message,
      body: commitSplitBody,
      footer: [],
      releaseType: null
    }
  },
  {
    type: "merge commit with a message, a body and a key/value footer",
    commit: `${mockedMergeCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message,
      body: commitSplitBody,
      footer: [keyValueFooter],
      releaseType: null
    }
  },
  {
    type: "merge commit with a message, a body and a breaking change footer",
    commit: `${mockedMergeCommitSampleWithBody}\n${commitIndent}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message,
      body: commitSplitBody,
      footer: [breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "merge commit with a message, a body and both footers",
    commit: `${mockedMergeCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message,
      body: commitSplitBody,
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "commit with just a major message",
    commit: mockedMajorCommitSample,
    expected: {
      isMergeCommit: false,
      sha,
      message: majorMessage,
      body: [],
      footer: [],
      releaseType: "major"
    }
  },
  {
    type: "commit with a major message and a key/value footer",
    commit: `${mockedMajorCommitSample}\n${commitIndent}\n${commitKeyValueFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: majorMessage,
      body: [],
      footer: [keyValueFooter],
      releaseType: "major"
    }
  },
  {
    type: "commit with a major message and a breaking change footer",
    commit: `${mockedMajorCommitSample}\n${commitIndent}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: majorMessage,
      body: [],
      footer: [breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "commit with a major message and both footers",
    commit: `${mockedMajorCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: majorMessage,
      body: [],
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "commit with just a major message and a body",
    commit: mockedMajorCommitSampleWithBody,
    expected: {
      isMergeCommit: false,
      sha,
      message: majorMessage,
      body: commitSplitBody,
      footer: [],
      releaseType: "major"
    }
  },
  {
    type: "commit with a major message, a body and a key/value footer",
    commit: `${mockedMajorCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: majorMessage,
      body: commitSplitBody,
      footer: [keyValueFooter],
      releaseType: "major"
    }
  },
  {
    type: "commit with a major message, a body and a breaking change footer",
    commit: `${mockedMajorCommitSampleWithBody}\n${commitIndent}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: majorMessage,
      body: commitSplitBody,
      footer: [breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "commit with a major message, a body and both footers",
    commit: `${mockedMajorCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: majorMessage,
      body: commitSplitBody,
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "merge commit with just a major message",
    commit: mockedMajorMergeCommitSample,
    expected: {
      isMergeCommit: true,
      sha,
      message: majorMessage,
      body: [],
      footer: [],
      releaseType: "major"
    }
  },
  {
    type: "merge commit with a major message and a key/value footer",
    commit: `${mockedMajorMergeCommitSample}\n${commitIndent}\n${commitKeyValueFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: majorMessage,
      body: [],
      footer: [keyValueFooter],
      releaseType: "major"
    }
  },
  {
    type: "merge commit with a major message and a breaking change footer",
    commit: `${mockedMajorMergeCommitSample}\n${commitIndent}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: majorMessage,
      body: [],
      footer: [breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "merge commit with a major message and both footers",
    commit: `${mockedMajorMergeCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: majorMessage,
      body: [],
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "merge commit with just a major message and a body",
    commit: mockedMajorMergeCommitSampleWithBody,
    expected: {
      isMergeCommit: true,
      sha,
      message: majorMessage,
      body: commitSplitBody,
      footer: [],
      releaseType: "major"
    }
  },
  {
    type: "merge commit with a major message, a body and a key/value footer",
    commit: `${mockedMajorMergeCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: majorMessage,
      body: commitSplitBody,
      footer: [keyValueFooter],
      releaseType: "major"
    }
  },
  {
    type: "merge commit with a major message, a body and a breaking change footer",
    commit: `${mockedMajorMergeCommitSampleWithBody}\n${commitIndent}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: majorMessage,
      body: commitSplitBody,
      footer: [breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "merge commit with a major message, a body and both footers",
    commit: `${mockedMajorMergeCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: majorMessage,
      body: commitSplitBody,
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "commit with just a minor message",
    commit: mockedMinorCommitSample,
    expected: {
      isMergeCommit: false,
      sha,
      message: minorMessage,
      body: [],
      footer: [],
      releaseType: "minor"
    }
  },
  {
    type: "commit with a minor message and a key/value footer",
    commit: `${mockedMinorCommitSample}\n${commitIndent}\n${commitKeyValueFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: minorMessage,
      body: [],
      footer: [keyValueFooter],
      releaseType: "minor"
    }
  },
  {
    type: "commit with a minor message and a breaking change footer",
    commit: `${mockedMinorCommitSample}\n${commitIndent}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: minorMessage,
      body: [],
      footer: [breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "commit with a minor message and both footers",
    commit: `${mockedMinorCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: minorMessage,
      body: [],
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "commit with just a minor message and a body",
    commit: mockedMinorCommitSampleWithBody,
    expected: {
      isMergeCommit: false,
      sha,
      message: minorMessage,
      body: commitSplitBody,
      footer: [],
      releaseType: "minor"
    }
  },
  {
    type: "commit with a minor message, a body and a key/value footer",
    commit: `${mockedMinorCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: minorMessage,
      body: commitSplitBody,
      footer: [keyValueFooter],
      releaseType: "minor"
    }
  },
  {
    type: "commit with a minor message, a body and a breaking change footer",
    commit: `${mockedMinorCommitSampleWithBody}\n${commitIndent}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: minorMessage,
      body: commitSplitBody,
      footer: [breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "commit with a minor message, a body and both footers",
    commit: `${mockedMinorCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: minorMessage,
      body: commitSplitBody,
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "merge commit with just a minor message",
    commit: mockedMinorMergeCommitSample,
    expected: {
      isMergeCommit: true,
      sha,
      message: minorMessage,
      body: [],
      footer: [],
      releaseType: "minor"
    }
  },
  {
    type: "merge commit with a minor message and a key/value footer",
    commit: `${mockedMinorMergeCommitSample}\n${commitIndent}\n${commitKeyValueFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: minorMessage,
      body: [],
      footer: [keyValueFooter],
      releaseType: "minor"
    }
  },
  {
    type: "merge commit with a minor message and a breaking change footer",
    commit: `${mockedMinorMergeCommitSample}\n${commitIndent}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: minorMessage,
      body: [],
      footer: [breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "merge commit with a minor message and both footers",
    commit: `${mockedMinorMergeCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: minorMessage,
      body: [],
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "merge commit with just a minor message and a body",
    commit: mockedMinorMergeCommitSampleWithBody,
    expected: {
      isMergeCommit: true,
      sha,
      message: minorMessage,
      body: commitSplitBody,
      footer: [],
      releaseType: "minor"
    }
  },
  {
    type: "merge commit with a minor message, a body and a key/value footer",
    commit: `${mockedMinorMergeCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: minorMessage,
      body: commitSplitBody,
      footer: [keyValueFooter],
      releaseType: "minor"
    }
  },
  {
    type: "merge commit with a minor message, a body and a breaking change footer",
    commit: `${mockedMinorMergeCommitSampleWithBody}\n${commitIndent}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: minorMessage,
      body: commitSplitBody,
      footer: [breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "merge commit with a minor message, a body and both footers",
    commit: `${mockedMinorMergeCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: minorMessage,
      body: commitSplitBody,
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "commit with just a patch message",
    commit: mockedPatchCommitSample,
    expected: {
      isMergeCommit: false,
      sha,
      message: patchMessage,
      body: [],
      footer: [],
      releaseType: "patch"
    }
  },
  {
    type: "commit with a patch message and a key/value footer",
    commit: `${mockedPatchCommitSample}\n${commitIndent}\n${commitKeyValueFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: patchMessage,
      body: [],
      footer: [keyValueFooter],
      releaseType: "patch"
    }
  },
  {
    type: "commit with a patch message and a breaking change footer",
    commit: `${mockedPatchCommitSample}\n${commitIndent}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: patchMessage,
      body: [],
      footer: [breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "commit with a patch message and both footers",
    commit: `${mockedPatchCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: patchMessage,
      body: [],
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "commit with just a patch message and a body",
    commit: mockedPatchCommitSampleWithBody,
    expected: {
      isMergeCommit: false,
      sha,
      message: patchMessage,
      body: commitSplitBody,
      footer: [],
      releaseType: "patch"
    }
  },
  {
    type: "commit with a patch message, a body and a key/value footer",
    commit: `${mockedPatchCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: patchMessage,
      body: commitSplitBody,
      footer: [keyValueFooter],
      releaseType: "patch"
    }
  },
  {
    type: "commit with a patch message, a body and a breaking change footer",
    commit: `${mockedPatchCommitSampleWithBody}\n${commitIndent}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: patchMessage,
      body: commitSplitBody,
      footer: [breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "commit with a patch message, a body and both footers",
    commit: `${mockedPatchCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: patchMessage,
      body: commitSplitBody,
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "merge commit with just a patch message",
    commit: mockedPatchMergeCommitSample,
    expected: {
      isMergeCommit: true,
      sha,
      message: patchMessage,
      body: [],
      footer: [],
      releaseType: "patch"
    }
  },
  {
    type: "merge commit with a patch message and a key/value footer",
    commit: `${mockedPatchMergeCommitSample}\n${commitIndent}\n${commitKeyValueFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: patchMessage,
      body: [],
      footer: [keyValueFooter],
      releaseType: "patch"
    }
  },
  {
    type: "merge commit with a patch message and a breaking change footer",
    commit: `${mockedPatchMergeCommitSample}\n${commitIndent}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: patchMessage,
      body: [],
      footer: [breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "merge commit with a patch message and both footers",
    commit: `${mockedPatchMergeCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: patchMessage,
      body: [],
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "merge commit with just a patch message and a body",
    commit: mockedPatchMergeCommitSampleWithBody,
    expected: {
      isMergeCommit: true,
      sha,
      message: patchMessage,
      body: commitSplitBody,
      footer: [],
      releaseType: "patch"
    }
  },
  {
    type: "merge commit with a patch message, a body and a key/value footer",
    commit: `${mockedPatchMergeCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: patchMessage,
      body: commitSplitBody,
      footer: [keyValueFooter],
      releaseType: "patch"
    }
  },
  {
    type: "merge commit with a patch message, a body and a breaking change footer",
    commit: `${mockedPatchMergeCommitSampleWithBody}\n${commitIndent}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: patchMessage,
      body: commitSplitBody,
      footer: [breakingChangeFooter],
      releaseType: "major"
    }
  },
  {
    type: "merge commit with a patch message, a body and both footers",
    commit: `${mockedPatchMergeCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: patchMessage,
      body: commitSplitBody,
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major"
    }
  }
];
export const mockedCommitsInMonorepo: { type: string; commit: string; expected: Commit }[] = [
  {
    type: "commit with just a message",
    commit: `${mockedCommitSample}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message,
      body: [],
      footer: [],
      releaseType: null,
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a message and a key/value footer",
    commit: `${mockedCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message,
      body: [],
      footer: [keyValueFooter],
      releaseType: null,
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a message and a breaking change footer",
    commit: `${mockedCommitSample}\n${commitIndent}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message,
      body: [],
      footer: [breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a message and both footers",
    commit: `${mockedCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message,
      body: [],
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with just a message and a body",
    commit: `${mockedCommitSampleWithBody}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message,
      body: commitSplitBody,
      footer: [],
      releaseType: null,
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a message, a body and a key/value footer",
    commit: `${mockedCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message,
      body: commitSplitBody,
      footer: [keyValueFooter],
      releaseType: null,
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a message, a body and a breaking change footer",
    commit: `${mockedCommitSampleWithBody}\n${commitIndent}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message,
      body: commitSplitBody,
      footer: [breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a message, a body and both footers",
    commit: `${mockedCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message,
      body: commitSplitBody,
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with just a message",
    commit: `${mockedMergeCommitSample}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message,
      body: [],
      footer: [],
      releaseType: null,
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a message and a key/value footer",
    commit: `${mockedMergeCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message,
      body: [],
      footer: [keyValueFooter],
      releaseType: null,
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a message and a breaking change footer",
    commit: `${mockedMergeCommitSample}\n${commitIndent}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message,
      body: [],
      footer: [breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a message and both footers",
    commit: `${mockedMergeCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message,
      body: [],
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with just a message and a body",
    commit: `${mockedMergeCommitSampleWithBody}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message,
      body: commitSplitBody,
      footer: [],
      releaseType: null,
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a message, a body and a key/value footer",
    commit: `${mockedMergeCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message,
      body: commitSplitBody,
      footer: [keyValueFooter],
      releaseType: null,
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a message, a body and a breaking change footer",
    commit: `${mockedMergeCommitSampleWithBody}\n${commitIndent}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message,
      body: commitSplitBody,
      footer: [breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a message, a body and both footers",
    commit: `${mockedMergeCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message,
      body: commitSplitBody,
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with just a major message",
    commit: `${mockedMajorCommitSample}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: majorMessage,
      body: [],
      footer: [],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a major message and a key/value footer",
    commit: `${mockedMajorCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: majorMessage,
      body: [],
      footer: [keyValueFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a major message and a breaking change footer",
    commit: `${mockedMajorCommitSample}\n${commitIndent}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: majorMessage,
      body: [],
      footer: [breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a major message and both footers",
    commit: `${mockedMajorCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: majorMessage,
      body: [],
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with just a major message and a body",
    commit: `${mockedMajorCommitSampleWithBody}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: majorMessage,
      body: commitSplitBody,
      footer: [],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a major message, a body and a key/value footer",
    commit: `${mockedMajorCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: majorMessage,
      body: commitSplitBody,
      footer: [keyValueFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a major message, a body and a breaking change footer",
    commit: `${mockedMajorCommitSampleWithBody}\n${commitIndent}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: majorMessage,
      body: commitSplitBody,
      footer: [breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a major message, a body and both footers",
    commit: `${mockedMajorCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: majorMessage,
      body: commitSplitBody,
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with just a major message",
    commit: `${mockedMajorMergeCommitSample}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: majorMessage,
      body: [],
      footer: [],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a major message and a key/value footer",
    commit: `${mockedMajorMergeCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: majorMessage,
      body: [],
      footer: [keyValueFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a major message and a breaking change footer",
    commit: `${mockedMajorMergeCommitSample}\n${commitIndent}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: majorMessage,
      body: [],
      footer: [breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a major message and both footers",
    commit: `${mockedMajorMergeCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: majorMessage,
      body: [],
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with just a major message and a body",
    commit: `${mockedMajorMergeCommitSampleWithBody}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: majorMessage,
      body: commitSplitBody,
      footer: [],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a major message, a body and a key/value footer",
    commit: `${mockedMajorMergeCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: majorMessage,
      body: commitSplitBody,
      footer: [keyValueFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a major message, a body and a breaking change footer",
    commit: `${mockedMajorMergeCommitSampleWithBody}\n${commitIndent}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: majorMessage,
      body: commitSplitBody,
      footer: [breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a major message, a body and both footers",
    commit: `${mockedMajorMergeCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: majorMessage,
      body: commitSplitBody,
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with just a minor message",
    commit: `${mockedMinorCommitSample}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: minorMessage,
      body: [],
      footer: [],
      releaseType: "minor",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a minor message and a key/value footer",
    commit: `${mockedMinorCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: minorMessage,
      body: [],
      footer: [keyValueFooter],
      releaseType: "minor",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a minor message and a breaking change footer",
    commit: `${mockedMinorCommitSample}\n${commitIndent}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: minorMessage,
      body: [],
      footer: [breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a minor message and both footers",
    commit: `${mockedMinorCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: minorMessage,
      body: [],
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with just a minor message and a body",
    commit: `${mockedMinorCommitSampleWithBody}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: minorMessage,
      body: commitSplitBody,
      footer: [],
      releaseType: "minor",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a minor message, a body and a key/value footer",
    commit: `${mockedMinorCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: minorMessage,
      body: commitSplitBody,
      footer: [keyValueFooter],
      releaseType: "minor",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a minor message, a body and a breaking change footer",
    commit: `${mockedMinorCommitSampleWithBody}\n${commitIndent}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: minorMessage,
      body: commitSplitBody,
      footer: [breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a minor message, a body and both footers",
    commit: `${mockedMinorCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: minorMessage,
      body: commitSplitBody,
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with just a minor message",
    commit: `${mockedMinorMergeCommitSample}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: minorMessage,
      body: [],
      footer: [],
      releaseType: "minor",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a minor message and a key/value footer",
    commit: `${mockedMinorMergeCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: minorMessage,
      body: [],
      footer: [keyValueFooter],
      releaseType: "minor",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a minor message and a breaking change footer",
    commit: `${mockedMinorMergeCommitSample}\n${commitIndent}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: minorMessage,
      body: [],
      footer: [breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a minor message and both footers",
    commit: `${mockedMinorMergeCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: minorMessage,
      body: [],
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with just a minor message and a body",
    commit: `${mockedMinorMergeCommitSampleWithBody}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: minorMessage,
      body: commitSplitBody,
      footer: [],
      releaseType: "minor",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a minor message, a body and a key/value footer",
    commit: `${mockedMinorMergeCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: minorMessage,
      body: commitSplitBody,
      footer: [keyValueFooter],
      releaseType: "minor",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a minor message, a body and a breaking change footer",
    commit: `${mockedMinorMergeCommitSampleWithBody}\n${commitIndent}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: minorMessage,
      body: commitSplitBody,
      footer: [breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a minor message, a body and both footers",
    commit: `${mockedMinorMergeCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: minorMessage,
      body: commitSplitBody,
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with just a patch message",
    commit: `${mockedPatchCommitSample}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: patchMessage,
      body: [],
      footer: [],
      releaseType: "patch",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a patch message and a key/value footer",
    commit: `${mockedPatchCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: patchMessage,
      body: [],
      footer: [keyValueFooter],
      releaseType: "patch",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a patch message and a breaking change footer",
    commit: `${mockedPatchCommitSample}\n${commitIndent}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: patchMessage,
      body: [],
      footer: [breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a patch message and both footers",
    commit: `${mockedPatchCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: patchMessage,
      body: [],
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with just a patch message and a body",
    commit: `${mockedPatchCommitSampleWithBody}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: patchMessage,
      body: commitSplitBody,
      footer: [],
      releaseType: "patch",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a patch message, a body and a key/value footer",
    commit: `${mockedPatchCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: patchMessage,
      body: commitSplitBody,
      footer: [keyValueFooter],
      releaseType: "patch",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a patch message, a body and a breaking change footer",
    commit: `${mockedPatchCommitSampleWithBody}\n${commitIndent}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: patchMessage,
      body: commitSplitBody,
      footer: [breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "commit with a patch message, a body and both footers",
    commit: `${mockedPatchCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: false,
      sha,
      message: patchMessage,
      body: commitSplitBody,
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with just a patch message",
    commit: `${mockedPatchMergeCommitSample}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: patchMessage,
      body: [],
      footer: [],
      releaseType: "patch",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a patch message and a key/value footer",
    commit: `${mockedPatchMergeCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: patchMessage,
      body: [],
      footer: [keyValueFooter],
      releaseType: "patch",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a patch message and a breaking change footer",
    commit: `${mockedPatchMergeCommitSample}\n${commitIndent}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: patchMessage,
      body: [],
      footer: [breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a patch message and both footers",
    commit: `${mockedPatchMergeCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: patchMessage,
      body: [],
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with just a patch message and a body",
    commit: `${mockedPatchMergeCommitSampleWithBody}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: patchMessage,
      body: commitSplitBody,
      footer: [],
      releaseType: "patch",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a patch message, a body and a key/value footer",
    commit: `${mockedPatchMergeCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: patchMessage,
      body: commitSplitBody,
      footer: [keyValueFooter],
      releaseType: "patch",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a patch message, a body and a breaking change footer",
    commit: `${mockedPatchMergeCommitSampleWithBody}\n${commitIndent}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: patchMessage,
      body: commitSplitBody,
      footer: [breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  },
  {
    type: "merge commit with a patch message, a body and both footers",
    commit: `${mockedPatchMergeCommitSampleWithBody}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}\n\n${modifiedFile}`,
    expected: {
      isMergeCommit: true,
      sha,
      message: patchMessage,
      body: commitSplitBody,
      footer: [keyValueFooter, breakingChangeFooter],
      releaseType: "major",
      modifiedFiles: [modifiedFile]
    }
  }
];
