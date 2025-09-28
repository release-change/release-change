import type { Commit } from "@release-change/shared";

type CommitType = Pick<Commit, "message" | "footer">;

const commitFooter = "Footer-key: value";
const commitBreakingChangeFooters = [
  "BREAKING CHANGE: some explanation.",
  "BREAKING-CHANGE: some explanation."
];
const commitTypes = [
  {
    isMajorChange: true,
    hasSemanticChange: true,
    prefix: "feat!",
    title: "add scope with breaking change"
  },
  {
    isMajorChange: true,
    hasSemanticChange: true,
    prefix: "feat(scope)!",
    title: "add scope with breaking change"
  },
  {
    isMajorChange: true,
    hasSemanticChange: true,
    prefix: "feat!",
    title: "merge scope with breaking change (#42)"
  },
  {
    isMajorChange: true,
    hasSemanticChange: true,
    prefix: "feat(scope)!",
    title: "merge scope with breaking change (#42)"
  },
  {
    isMajorChange: true,
    hasSemanticChange: true,
    prefix: "fix!",
    title: "fix bug with breaking change"
  },
  {
    isMajorChange: true,
    hasSemanticChange: true,
    prefix: "fix(scope)!",
    title: "fix bug with breaking change"
  },
  {
    isMajorChange: true,
    hasSemanticChange: true,
    prefix: "fix!",
    title: "merge bug fix with breaking change (#42)"
  },
  {
    isMajorChange: true,
    hasSemanticChange: true,
    prefix: "fix(scope)!",
    title: "merge bug fix with breaking change (#42)"
  },
  {
    isMajorChange: true,
    hasSemanticChange: true,
    prefix: "chore!",
    title: "update with breaking change"
  },
  {
    isMajorChange: true,
    hasSemanticChange: true,
    prefix: "chore(scope)!",
    title: "update with breaking change"
  },
  {
    isMajorChange: true,
    hasSemanticChange: true,
    prefix: "chore!",
    title: "merge update with breaking change (#42)"
  },
  {
    isMajorChange: true,
    hasSemanticChange: true,
    prefix: "chore(scope)!",
    title: "merge update with breaking change (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    prefix: "feat",
    title: "add scope with breaking change"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    prefix: "feat(scope)",
    title: "add scope with breaking change"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    prefix: "feat",
    title: "merge scope with breaking change (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    prefix: "feat(scope)",
    title: "merge scope with breaking change (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    prefix: "fix",
    title: "fix bug with breaking change"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    prefix: "fix(scope)",
    title: "fix bug with breaking change"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    prefix: "fix",
    title: "merge bug fix with breaking change (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    prefix: "fix(scope)",
    title: "merge bug fix with breaking change (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: false,
    prefix: "chore",
    title: "update with breaking change"
  },
  {
    isMajorChange: false,
    hasSemanticChange: false,
    prefix: "chore(scope)",
    title: "update with breaking change"
  },
  {
    isMajorChange: false,
    hasSemanticChange: false,
    prefix: "chore",
    title: "merge update with breaking change (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: false,
    prefix: "chore(scope)",
    title: "merge update with breaking change (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    prefix: "feat",
    title: "add scope"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    prefix: "feat(scope)",
    title: "add scope"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    prefix: "feat",
    title: "merge scope (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    prefix: "feat(scope)",
    title: "merge scope (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    prefix: "fix",
    title: "fix bug"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    prefix: "fix(scope)",
    title: "fix bug"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    prefix: "fix",
    title: "merge bug fix (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: true,
    prefix: "fix(scope)",
    title: "merge bug fix (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: false,
    prefix: "chore",
    title: "update"
  },
  {
    isMajorChange: false,
    hasSemanticChange: false,
    prefix: "chore(scope)",
    title: "update"
  },
  {
    isMajorChange: false,
    hasSemanticChange: false,
    prefix: "chore",
    title: "merge update (#42)"
  },
  {
    isMajorChange: false,
    hasSemanticChange: false,
    prefix: "chore(scope)",
    title: "merge update (#42)"
  }
];
export const majorTypeCommits: CommitType[] = [];
export const minorTypeCommits: CommitType[] = [];
export const patchTypeCommits: CommitType[] = [];
export const otherTypeCommits: CommitType[] = [];
export const majorTypeCommitsWithUpperCasePrefix: CommitType[] = [];
export const minorTypeCommitsWithUpperCasePrefix: CommitType[] = [];
export const patchTypeCommitsWithUpperCasePrefix: CommitType[] = [];
export const otherTypeCommitsWithUpperCasePrefix: CommitType[] = [];
for (const commitType of commitTypes) {
  const { isMajorChange, hasSemanticChange, prefix, title } = commitType;
  const commitSample = {
    message: `${prefix}: ${title}`,
    footer: []
  };
  const commitSampleWithFooter = {
    ...commitSample,
    footer: [commitFooter]
  };
  const commitSamplesWithBodyAndBreakingChangeFooter = commitBreakingChangeFooters.map(
    breakingChange => {
      return {
        ...commitSample,
        footer: [breakingChange]
      };
    }
  );
  const commitSamplesWithBreakingChangeFooter = commitBreakingChangeFooters.map(breakingChange => {
    return {
      ...commitSample,
      footer: [breakingChange]
    };
  });
  const commitSampleWithUpperCasePrefix = {
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
