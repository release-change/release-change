export const mockedRepoMergeInfo = [
  {
    response: {
      data: {
        repository: {
          autoMergeAllowed: false,
          mergeCommitAllowed: false,
          rebaseMergeAllowed: false,
          squashMergeAllowed: false
        }
      }
    },
    expected: {
      autoMergeAllowed: false,
      mergeCommitAllowed: false,
      rebaseMergeAllowed: false,
      squashMergeAllowed: false
    }
  },
  {
    response: {
      data: {
        repository: {
          autoMergeAllowed: true,
          mergeCommitAllowed: false,
          rebaseMergeAllowed: false,
          squashMergeAllowed: false
        }
      }
    },
    expected: {
      autoMergeAllowed: true,
      mergeCommitAllowed: false,
      rebaseMergeAllowed: false,
      squashMergeAllowed: false
    }
  },
  {
    response: {
      data: {
        repository: {
          autoMergeAllowed: false,
          mergeCommitAllowed: true,
          rebaseMergeAllowed: false,
          squashMergeAllowed: false
        }
      }
    },
    expected: {
      autoMergeAllowed: false,
      mergeCommitAllowed: true,
      rebaseMergeAllowed: false,
      squashMergeAllowed: false
    }
  },
  {
    response: {
      data: {
        repository: {
          autoMergeAllowed: false,
          mergeCommitAllowed: false,
          rebaseMergeAllowed: true,
          squashMergeAllowed: false
        }
      }
    },
    expected: {
      autoMergeAllowed: false,
      mergeCommitAllowed: false,
      rebaseMergeAllowed: true,
      squashMergeAllowed: false
    }
  },
  {
    response: {
      data: {
        repository: {
          autoMergeAllowed: false,
          mergeCommitAllowed: false,
          rebaseMergeAllowed: false,
          squashMergeAllowed: true
        }
      }
    },
    expected: {
      autoMergeAllowed: false,
      mergeCommitAllowed: false,
      rebaseMergeAllowed: false,
      squashMergeAllowed: true
    }
  }
];
