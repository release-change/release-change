export const mockedAutoMergeEnablingsInMonorepo = [
  {
    mergeOptions: {
      autoMergeAllowed: true,
      mergeCommitAllowed: true,
      rebaseMergeAllowed: false,
      squashMergeAllowed: false
    },
    expectedMergeMethod: "MERGE"
  },
  {
    mergeOptions: {
      autoMergeAllowed: true,
      mergeCommitAllowed: true,
      rebaseMergeAllowed: true,
      squashMergeAllowed: false
    },
    expectedMergeMethod: "REBASE"
  },
  {
    mergeOptions: {
      autoMergeAllowed: true,
      mergeCommitAllowed: true,
      rebaseMergeAllowed: true,
      squashMergeAllowed: true
    },
    expectedMergeMethod: "REBASE"
  },
  {
    mergeOptions: {
      autoMergeAllowed: true,
      mergeCommitAllowed: true,
      rebaseMergeAllowed: false,
      squashMergeAllowed: true
    },
    expectedMergeMethod: "MERGE"
  },
  {
    mergeOptions: {
      autoMergeAllowed: true,
      mergeCommitAllowed: false,
      rebaseMergeAllowed: true,
      squashMergeAllowed: false
    },
    expectedMergeMethod: "REBASE"
  },
  {
    mergeOptions: {
      autoMergeAllowed: true,
      mergeCommitAllowed: false,
      rebaseMergeAllowed: true,
      squashMergeAllowed: true
    },
    expectedMergeMethod: "REBASE"
  },
  {
    mergeOptions: {
      autoMergeAllowed: true,
      mergeCommitAllowed: false,
      rebaseMergeAllowed: false,
      squashMergeAllowed: true
    },
    expectedMergeMethod: "SQUASH"
  }
];
