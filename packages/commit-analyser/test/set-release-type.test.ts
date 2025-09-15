import type { Commit } from "@release-change/shared";

import { setLogger } from "@release-change/logger";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { setReleaseType } from "../src/index.js";
import { mockedContext } from "./fixtures/mocked-context.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

const commitBody = "Some text for the commit body.";
const commitFooter = "Footer-key: value";
const commitBreakingChangeFooters = [
  "BREAKING CHANGE: some explanation.",
  "BREAKING-CHANGE: some explanation."
];
const commitTypes = [
  {
    isMajorChange: true,
    hasSemanticChange: true,
    isMergeCommit: false,
    hasBang: true,
    prefix: "feat!",
    title: "add scope with breaking change"
  },
  {
    isMajorChange: true,
    hasSemanticChange: true,
    isMergeCommit: false,
    hasBang: true,
    prefix: "feat(scope)!",
    title: "add scope with breaking change"
  },
  {
    isMajorChange: true,
    hasSemanticChange: true,
    isMergeCommit: true,
    hasBang: true,
    prefix: "feat!",
    title: "merge scope with breaking change (#42)"
  },
  {
    isMajorChange: true,
    hasSemanticChange: true,
    isMergeCommit: true,
    hasBang: true,
    prefix: "feat(scope)!",
    title: "merge scope with breaking change (#42)"
  },
  {
    isMajorChange: true,
    hasSemanticChange: true,
    isMergeCommit: false,
    hasBang: true,
    prefix: "fix!",
    title: "fix bug with breaking change"
  },
  {
    isMajorChange: true,
    hasSemanticChange: true,
    isMergeCommit: false,
    hasBang: true,
    prefix: "fix(scope)!",
    title: "fix bug with breaking change"
  },
  {
    isMajorChange: true,
    hasSemanticChange: true,
    isMergeCommit: true,
    hasBang: true,
    prefix: "fix!",
    title: "merge bug fix with breaking change (#42)"
  },
  {
    isMajorChange: true,
    hasSemanticChange: true,
    isMergeCommit: true,
    hasBang: true,
    prefix: "fix(scope)!",
    title: "merge bug fix with breaking change (#42)"
  },
  {
    isMajorChange: true,
    hasSemanticChange: true,
    isMergeCommit: false,
    hasBang: true,
    prefix: "chore!",
    title: "update with breaking change"
  },
  {
    isMajorChange: true,
    hasSemanticChange: true,
    isMergeCommit: false,
    hasBang: true,
    prefix: "chore(scope)!",
    title: "update with breaking change"
  },
  {
    isMajorChange: true,
    hasSemanticChange: true,
    isMergeCommit: true,
    hasBang: true,
    prefix: "chore!",
    title: "merge update with breaking change (#42)"
  },
  {
    isMajorChange: true,
    hasSemanticChange: true,
    isMergeCommit: true,
    hasBang: true,
    prefix: "chore(scope)!",
    title: "merge update with breaking change (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    isMergeCommit: false,
    hasBang: false,
    prefix: "feat",
    title: "add scope with breaking change"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    isMergeCommit: false,
    hasBang: false,
    prefix: "feat(scope)",
    title: "add scope with breaking change"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    isMergeCommit: true,
    hasBang: false,
    prefix: "feat",
    title: "merge scope with breaking change (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    isMergeCommit: true,
    hasBang: false,
    prefix: "feat(scope)",
    title: "merge scope with breaking change (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    isMergeCommit: false,
    hasBang: false,
    prefix: "fix",
    title: "fix bug with breaking change"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    isMergeCommit: false,
    hasBang: false,
    prefix: "fix(scope)",
    title: "fix bug with breaking change"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    isMergeCommit: true,
    hasBang: false,
    prefix: "fix",
    title: "merge bug fix with breaking change (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    isMergeCommit: true,
    hasBang: false,
    prefix: "fix(scope)",
    title: "merge bug fix with breaking change (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: false,
    isMergeCommit: false,
    hasBang: false,
    prefix: "chore",
    title: "update with breaking change"
  },
  {
    isMajorChange: false,
    hasSemanticChange: false,
    isMergeCommit: false,
    hasBang: false,
    prefix: "chore(scope)",
    title: "update with breaking change"
  },
  {
    isMajorChange: false,
    hasSemanticChange: false,
    isMergeCommit: true,
    hasBang: false,
    prefix: "chore",
    title: "merge update with breaking change (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: false,
    isMergeCommit: true,
    hasBang: false,
    prefix: "chore(scope)",
    title: "merge update with breaking change (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    isMergeCommit: false,
    hasBang: false,
    prefix: "feat",
    title: "add scope"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    isMergeCommit: false,
    hasBang: false,
    prefix: "feat(scope)",
    title: "add scope"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    isMergeCommit: true,
    hasBang: false,
    prefix: "feat",
    title: "merge scope (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    isMergeCommit: true,
    hasBang: false,
    prefix: "feat(scope)",
    title: "merge scope (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    isMergeCommit: false,
    hasBang: false,
    prefix: "fix",
    title: "fix bug"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    isMergeCommit: false,
    hasBang: false,
    prefix: "fix(scope)",
    title: "fix bug"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    isMergeCommit: true,
    hasBang: false,
    prefix: "fix",
    title: "merge bug fix (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    isMergeCommit: true,
    hasBang: false,
    prefix: "fix(scope)",
    title: "merge bug fix (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: false,
    isMergeCommit: false,
    hasBang: false,
    prefix: "chore",
    title: "update"
  },
  {
    isMajorChange: false,
    hasSemanticChange: false,
    isMergeCommit: false,
    hasBang: false,
    prefix: "chore(scope)",
    title: "update"
  },
  {
    isMajorChange: false,
    hasSemanticChange: false,
    isMergeCommit: true,
    hasBang: false,
    prefix: "chore",
    title: "merge update (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: false,
    isMergeCommit: true,
    hasBang: false,
    prefix: "chore(scope)",
    title: "merge update (#42)"
  }
];
const majorTypeCommits: Commit[] = [];
const minorTypeCommits: Commit[] = [];
const patchTypeCommits: Commit[] = [];
const otherTypeCommits: Commit[] = [];
const majorTypeCommitsWithUpperCasePrefix: Commit[] = [];
const minorTypeCommitsWithUpperCasePrefix: Commit[] = [];
const patchTypeCommitsWithUpperCasePrefix: Commit[] = [];
const otherTypeCommitsWithUpperCasePrefix: Commit[] = [];
for (const commitType of commitTypes) {
  const { isMajorChange, hasSemanticChange, isMergeCommit, prefix, title } = commitType;
  const commitSample: Commit = {
    isMergeCommit,
    sha: "0123456789abcdef0123456789abcdef01234567",
    message: `${prefix}: ${title}`,
    body: [],
    footer: []
  };
  const commitSampleWithFooter: Commit = {
    ...commitSample,
    footer: [commitFooter]
  };
  const commitSamplesWithBodyAndBreakingChangeFooter: Commit[] = commitBreakingChangeFooters.map(
    breakingChange => {
      return {
        ...commitSample,
        body: [commitBody],
        footer: [breakingChange]
      };
    }
  );
  const commitSamplesWithBreakingChangeFooter: Commit[] = commitBreakingChangeFooters.map(
    breakingChange => {
      return {
        ...commitSample,
        footer: [breakingChange]
      };
    }
  );
  const commitSampleWithUpperCasePrefix: Commit = {
    ...commitSample,
    message: `${prefix.toUpperCase()}: ${title}`
  };
  if (isMajorChange) {
    majorTypeCommits.push(
      commitSample,
      commitSampleWithFooter,
      ...commitSamplesWithBodyAndBreakingChangeFooter,
      ...commitSamplesWithBreakingChangeFooter
    );
    majorTypeCommitsWithUpperCasePrefix.push(commitSampleWithUpperCasePrefix);
  } else {
    majorTypeCommits.push(
      ...commitSamplesWithBodyAndBreakingChangeFooter,
      ...commitSamplesWithBreakingChangeFooter
    );
    if (hasSemanticChange) {
      if (prefix.match(/feat/i)) {
        minorTypeCommits.push(commitSample, commitSampleWithFooter);
        minorTypeCommitsWithUpperCasePrefix.push(commitSampleWithUpperCasePrefix);
      } else {
        patchTypeCommits.push(commitSample, commitSampleWithFooter);
        patchTypeCommitsWithUpperCasePrefix.push(commitSampleWithUpperCasePrefix);
      }
    } else {
      otherTypeCommits.push(commitSample);
      otherTypeCommitsWithUpperCasePrefix.push(commitSampleWithUpperCasePrefix);
    }
  }
}
const expectedMajorLogMessage = "The release type for the commit is major.";
const expectedMinorLogMessage = "The release type for the commit is minor.";
const expectedPatchLogMessage = "The release type for the commit is patch.";
const expectedNoReleaseLogMessage = "The commit does not trigger a release.";

beforeEach(() => {
  vi.mock("@release-change/logger", () => ({
    checkErrorType: vi.fn(),
    setLogger: vi.fn()
  }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});

afterEach(() => {
  vi.clearAllMocks();
});

it.each(majorTypeCommits)("should trigger a major release for commit %#", majorTypeCommit => {
  expect(setReleaseType(majorTypeCommit, mockedContext)).toBe("major");
  expect(mockedLogger.logInfo).toHaveBeenCalledWith(expectedMajorLogMessage);
});
it.each(minorTypeCommits)("should trigger a minor release for commit %#", minorTypeCommit => {
  expect(setReleaseType(minorTypeCommit, mockedContext)).toBe("minor");
  expect(mockedLogger.logInfo).toHaveBeenCalledWith(expectedMinorLogMessage);
});
it.each(patchTypeCommits)("should trigger a patch release for commit %#", patchTypeCommit => {
  expect(setReleaseType(patchTypeCommit, mockedContext)).toBe("patch");
  expect(mockedLogger.logInfo).toHaveBeenCalledWith(expectedPatchLogMessage);
});
it.each(otherTypeCommits)("should not trigger a release for commit %#", otherTypeCommit => {
  expect(setReleaseType(otherTypeCommit, mockedContext)).toBe(null);
  expect(mockedLogger.logInfo).toHaveBeenCalledWith(expectedNoReleaseLogMessage);
});
it.each(majorTypeCommitsWithUpperCasePrefix)(
  "should trigger a major release for commit %# with upper case prefix",
  majorTypeCommitWithUpperCasePrefix => {
    expect(setReleaseType(majorTypeCommitWithUpperCasePrefix, mockedContext)).toBe("major");
    expect(mockedLogger.logInfo).toHaveBeenCalledWith(expectedMajorLogMessage);
  }
);
it.each(minorTypeCommitsWithUpperCasePrefix)(
  "should trigger a minor release for commit %# with upper case prefix",
  minorTypeCommitWithUpperCasePrefix => {
    expect(setReleaseType(minorTypeCommitWithUpperCasePrefix, mockedContext)).toBe("minor");
    expect(mockedLogger.logInfo).toHaveBeenCalledWith(expectedMinorLogMessage);
  }
);
it.each(patchTypeCommitsWithUpperCasePrefix)(
  "should trigger a patch release for commit %# with upper case prefix",
  patchTypeCommitWithUpperCasePrefix => {
    expect(setReleaseType(patchTypeCommitWithUpperCasePrefix, mockedContext)).toBe("patch");
    expect(mockedLogger.logInfo).toHaveBeenCalledWith(expectedPatchLogMessage);
  }
);
it.each(otherTypeCommitsWithUpperCasePrefix)(
  "should not trigger a release for commit %# with upper case prefix",
  otherTypeCommitWithUpperCasePrefix => {
    expect(setReleaseType(otherTypeCommitWithUpperCasePrefix, mockedContext)).toBe(null);
    expect(mockedLogger.logInfo).toHaveBeenCalledWith(expectedNoReleaseLogMessage);
  }
);
it("should not trigger a release for commits not following Conventional Commits syntax", () => {
  const unconventionalCommitMessage = "Commit not following Conventional Commits syntax";
  const unconventionalCommit = {
    isMergeCommit: false,
    sha: "0123456789abcdef0123456789abcdef01234567",
    message: unconventionalCommitMessage,
    body: [],
    footer: []
  };
  expect(setReleaseType(unconventionalCommit, mockedContext)).toBe(null);
  expect(mockedLogger.logInfo).toHaveBeenCalledWith(expectedNoReleaseLogMessage);
});
