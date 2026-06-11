import type { PullRequestReference } from "../../src/index.js";

const commitSignature =
  "Co-authored-by: mocked-committer-name [bot] <0+mocked-committer-name-bot@users.noreply.github.com>";
const pullRequestReference: PullRequestReference = {
  pullRequestNumber: 123,
  pullRequestId: "fake_ID",
  commits: [
    `chore: @monorepo/a/v1.0.0 [skip ci]\n\n${commitSignature}`,
    `chore: @monorepo/b/v1.2.3 [skip ci]\n\n${commitSignature}`
  ]
};
export const mockedAutoMergeEnablingsInMonorepo = [
  {
    pullRequestReference,
    mergeOptions: {
      autoMergeAllowed: true,
      mergeCommitAllowed: true,
      rebaseMergeAllowed: false,
      squashMergeAllowed: false
    },
    expectedMergeMethod: "MERGE",
    expectedCommitHeadline: "chore: release version packages [skip ci] (#123)",
    expectedCommitBody: commitSignature
  },
  {
    pullRequestReference,
    mergeOptions: {
      autoMergeAllowed: true,
      mergeCommitAllowed: true,
      rebaseMergeAllowed: true,
      squashMergeAllowed: false
    },
    expectedMergeMethod: "REBASE",
    expectedCommitHeadline: undefined,
    expectedCommitBody: undefined
  },
  {
    pullRequestReference,
    mergeOptions: {
      autoMergeAllowed: true,
      mergeCommitAllowed: true,
      rebaseMergeAllowed: true,
      squashMergeAllowed: true
    },
    expectedMergeMethod: "REBASE",
    expectedCommitHeadline: undefined,
    expectedCommitBody: undefined
  },
  {
    pullRequestReference,
    mergeOptions: {
      autoMergeAllowed: true,
      mergeCommitAllowed: true,
      rebaseMergeAllowed: false,
      squashMergeAllowed: true
    },
    expectedMergeMethod: "MERGE",
    expectedCommitHeadline: "chore: release version packages [skip ci] (#123)",
    expectedCommitBody: commitSignature
  },
  {
    pullRequestReference,
    mergeOptions: {
      autoMergeAllowed: true,
      mergeCommitAllowed: false,
      rebaseMergeAllowed: true,
      squashMergeAllowed: false
    },
    expectedMergeMethod: "REBASE",
    expectedCommitHeadline: undefined,
    expectedCommitBody: undefined
  },
  {
    pullRequestReference,
    mergeOptions: {
      autoMergeAllowed: true,
      mergeCommitAllowed: false,
      rebaseMergeAllowed: true,
      squashMergeAllowed: true
    },
    expectedMergeMethod: "REBASE",
    expectedCommitHeadline: undefined,
    expectedCommitBody: undefined
  },
  {
    pullRequestReference,
    mergeOptions: {
      autoMergeAllowed: true,
      mergeCommitAllowed: false,
      rebaseMergeAllowed: false,
      squashMergeAllowed: true
    },
    expectedMergeMethod: "SQUASH",
    expectedCommitHeadline: "chore: release version packages [skip ci] (#123)",
    expectedCommitBody: `- chore: @monorepo/a/v1.0.0 [skip ci]\n- chore: @monorepo/b/v1.2.3 [skip ci]\n\n${commitSignature}`
  }
];
