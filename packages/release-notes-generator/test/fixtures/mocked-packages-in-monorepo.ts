import {
  mockedMajorLevelParsedCommitsInMonorepo,
  mockedMinorLevelParsedCommitsInMonorepo,
  mockedPatchLevelParsedCommitsInMonorepo
} from "./mocked-parsed-commits-in-monorepo.js";
import {
  mockedMajorAlphaParsedReleaseCommit,
  mockedMajorBetaParsedReleaseCommit,
  mockedMajorNextParsedReleaseCommit,
  mockedMajorParsedReleaseCommit,
  mockedMinorAlphaParsedReleaseCommit,
  mockedMinorBetaParsedReleaseCommit,
  mockedMinorNextParsedReleaseCommit,
  mockedMinorParsedReleaseCommit,
  mockedPatchAlphaParsedReleaseCommit,
  mockedPatchBetaParsedReleaseCommit,
  mockedPatchNextParsedReleaseCommit,
  mockedPatchParsedReleaseCommit
} from "./mocked-parsed-release-commits.js";

export const mockedPackagesInMonorepo = [
  {
    branch: "main",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.0.0",
      version: "1.0.0"
    },
    expectedReleaseNotes: {
      tagName: "v1.0.0",
      target: "main",
      isPrerelease: false,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.0.0",
      version: "1.0.0"
    },
    expectedReleaseNotes: {
      tagName: "v1.0.0",
      target: "main",
      isPrerelease: false,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "main",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0",
      version: "2.0.0"
    },
    expectedReleaseNotes: {
      tagName: "v2.0.0",
      target: "main",
      isPrerelease: false,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v2.0.0`](https://github.com/user-id/repo-name/compare/v1.2.0...v2.0.0)"
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0",
      version: "2.0.0"
    },
    expectedReleaseNotes: {
      tagName: "v2.0.0",
      target: "main",
      isPrerelease: false,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v2.0.0`](https://github.com/user-id/repo-name/compare/v1.2.0...v2.0.0)"
      }
    }
  },
  {
    branch: "main",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0-alpha.1",
      version: "1.2.0-alpha.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0",
      version: "2.0.0"
    },
    expectedReleaseNotes: {
      tagName: "v2.0.0",
      target: "main",
      isPrerelease: false,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0-alpha.1...v2.0.0`](https://github.com/user-id/repo-name/compare/v1.2.0-alpha.1...v2.0.0)"
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0-alpha.1",
      version: "1.2.0-alpha.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0",
      version: "2.0.0"
    },
    expectedReleaseNotes: {
      tagName: "v2.0.0",
      target: "main",
      isPrerelease: false,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0-alpha.1...v2.0.0`](https://github.com/user-id/repo-name/compare/v1.2.0-alpha.1...v2.0.0)"
      }
    }
  },
  {
    branch: "main",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0-beta.1",
      version: "1.2.0-beta.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0",
      version: "2.0.0"
    },
    expectedReleaseNotes: {
      tagName: "v2.0.0",
      target: "main",
      isPrerelease: false,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0-beta.1...v2.0.0`](https://github.com/user-id/repo-name/compare/v1.2.0-beta.1...v2.0.0)"
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0-beta.1",
      version: "1.2.0-beta.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0",
      version: "2.0.0"
    },
    expectedReleaseNotes: {
      tagName: "v2.0.0",
      target: "main",
      isPrerelease: false,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0-beta.1...v2.0.0`](https://github.com/user-id/repo-name/compare/v1.2.0-beta.1...v2.0.0)"
      }
    }
  },
  {
    branch: "main",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0-rc.1",
      version: "1.2.0-rc.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0",
      version: "2.0.0"
    },
    expectedReleaseNotes: {
      tagName: "v2.0.0",
      target: "main",
      isPrerelease: false,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0-rc.1...v2.0.0`](https://github.com/user-id/repo-name/compare/v1.2.0-rc.1...v2.0.0)"
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0-rc.1",
      version: "1.2.0-rc.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0",
      version: "2.0.0"
    },
    expectedReleaseNotes: {
      tagName: "v2.0.0",
      target: "main",
      isPrerelease: false,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0-rc.1...v2.0.0`](https://github.com/user-id/repo-name/compare/v1.2.0-rc.1...v2.0.0)"
      }
    }
  },
  {
    branch: "main",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v0.1.0",
      version: "0.1.0"
    },
    expectedReleaseNotes: {
      tagName: "v0.1.0",
      target: "main",
      isPrerelease: false,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v0.1.0",
      version: "0.1.0"
    },
    expectedReleaseNotes: {
      tagName: "v0.1.0",
      target: "main",
      isPrerelease: false,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "main",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0",
      version: "1.3.0"
    },
    expectedReleaseNotes: {
      tagName: "v1.3.0",
      target: "main",
      isPrerelease: false,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v1.3.0`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.3.0)"
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0",
      version: "1.3.0"
    },
    expectedReleaseNotes: {
      tagName: "v1.3.0",
      target: "main",
      isPrerelease: false,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v1.3.0`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.3.0)"
      }
    }
  },
  {
    branch: "main",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0-alpha.1",
      version: "1.2.0-alpha.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    expectedReleaseNotes: {
      tagName: "v1.2.0",
      target: "main",
      isPrerelease: false,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0-alpha.1...v1.2.0`](https://github.com/user-id/repo-name/compare/v1.2.0-alpha.1...v1.2.0)"
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0-alpha.1",
      version: "1.2.0-alpha.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    expectedReleaseNotes: {
      tagName: "v1.2.0",
      target: "main",
      isPrerelease: false,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0-alpha.1...v1.2.0`](https://github.com/user-id/repo-name/compare/v1.2.0-alpha.1...v1.2.0)"
      }
    }
  },
  {
    branch: "main",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0-beta.1",
      version: "1.2.0-beta.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    expectedReleaseNotes: {
      tagName: "v1.2.0",
      target: "main",
      isPrerelease: false,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0-beta.1...v1.2.0`](https://github.com/user-id/repo-name/compare/v1.2.0-beta.1...v1.2.0)"
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0-beta.1",
      version: "1.2.0-beta.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    expectedReleaseNotes: {
      tagName: "v1.2.0",
      target: "main",
      isPrerelease: false,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0-beta.1...v1.2.0`](https://github.com/user-id/repo-name/compare/v1.2.0-beta.1...v1.2.0)"
      }
    }
  },
  {
    branch: "main",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0-rc.1",
      version: "1.2.0-rc.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    expectedReleaseNotes: {
      tagName: "v1.2.0",
      target: "main",
      isPrerelease: false,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0-rc.1...v1.2.0`](https://github.com/user-id/repo-name/compare/v1.2.0-rc.1...v1.2.0)"
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0-rc.1",
      version: "1.2.0-rc.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    expectedReleaseNotes: {
      tagName: "v1.2.0",
      target: "main",
      isPrerelease: false,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0-rc.1...v1.2.0`](https://github.com/user-id/repo-name/compare/v1.2.0-rc.1...v1.2.0)"
      }
    }
  },
  {
    branch: "main",
    commits: mockedPatchLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v0.0.1",
      version: "0.0.1"
    },
    expectedReleaseNotes: {
      tagName: "v0.0.1",
      target: "main",
      isPrerelease: false,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedPatchLevelParsedCommitsInMonorepo, mockedPatchParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v0.0.1",
      version: "0.0.1"
    },
    expectedReleaseNotes: {
      tagName: "v0.0.1",
      target: "main",
      isPrerelease: false,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "main",
    commits: mockedPatchLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.1",
      version: "1.2.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.2.1",
      target: "main",
      isPrerelease: false,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v1.2.1`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.2.1)"
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedPatchLevelParsedCommitsInMonorepo, mockedPatchParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.1",
      version: "1.2.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.2.1",
      target: "main",
      isPrerelease: false,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v1.2.1`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.2.1)"
      }
    }
  },
  {
    branch: "alpha",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.0.0-alpha.1",
      version: "1.0.0-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.0.0-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "alpha",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorAlphaParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.0.0-alpha.1",
      version: "1.0.0-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.0.0-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "alpha",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0-alpha.1",
      version: "2.0.0-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "v2.0.0-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v2.0.0-alpha.1`](https://github.com/user-id/repo-name/compare/v1.2.0...v2.0.0-alpha.1)"
      }
    }
  },
  {
    branch: "alpha",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorAlphaParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0-alpha.1",
      version: "2.0.0-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "v2.0.0-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v2.0.0-alpha.1`](https://github.com/user-id/repo-name/compare/v1.2.0...v2.0.0-alpha.1)"
      }
    }
  },
  {
    branch: "alpha",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v0.1.0-alpha.1",
      version: "0.1.0-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "v0.1.0-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "alpha",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorAlphaParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v0.1.0-alpha.1",
      version: "0.1.0-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "v0.1.0-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "alpha",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0-alpha.1",
      version: "1.3.0-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.3.0-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v1.3.0-alpha.1`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.3.0-alpha.1)"
      }
    }
  },
  {
    branch: "alpha",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorAlphaParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0-alpha.1",
      version: "1.3.0-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.3.0-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v1.3.0-alpha.1`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.3.0-alpha.1)"
      }
    }
  },
  {
    branch: "alpha",
    commits: mockedPatchLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v0.0.1-alpha.1",
      version: "0.0.1-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "v0.0.1-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "alpha",
    commits: [...mockedPatchLevelParsedCommitsInMonorepo, mockedPatchAlphaParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v0.0.1-alpha.1",
      version: "0.0.1-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "v0.0.1-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "alpha",
    commits: mockedPatchLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.1-alpha.1",
      version: "1.2.1-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.2.1-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v1.2.1-alpha.1`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.2.1-alpha.1)"
      }
    }
  },
  {
    branch: "alpha",
    commits: [...mockedPatchLevelParsedCommitsInMonorepo, mockedPatchAlphaParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.1-alpha.1",
      version: "1.2.1-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.2.1-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v1.2.1-alpha.1`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.2.1-alpha.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.0.0-beta.1",
      version: "1.0.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.0.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "beta",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorBetaParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.0.0-beta.1",
      version: "1.0.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.0.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "beta",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0-beta.1",
      version: "2.0.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "v2.0.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v2.0.0-beta.1`](https://github.com/user-id/repo-name/compare/v1.2.0...v2.0.0-beta.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorBetaParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0-beta.1",
      version: "2.0.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "v2.0.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v2.0.0-beta.1`](https://github.com/user-id/repo-name/compare/v1.2.0...v2.0.0-beta.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0-alpha.1",
      version: "2.0.0-alpha.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0-beta.1",
      version: "2.0.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "v2.0.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v2.0.0-alpha.1...v2.0.0-beta.1`](https://github.com/user-id/repo-name/compare/v2.0.0-alpha.1...v2.0.0-beta.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorBetaParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0-alpha.1",
      version: "2.0.0-alpha.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0-beta.1",
      version: "2.0.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "v2.0.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v2.0.0-alpha.1...v2.0.0-beta.1`](https://github.com/user-id/repo-name/compare/v2.0.0-alpha.1...v2.0.0-beta.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v0.1.0-beta.1",
      version: "0.1.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "v0.1.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "beta",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorBetaParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v0.1.0-beta.1",
      version: "0.1.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "v0.1.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "beta",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0-beta.1",
      version: "1.3.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.3.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v1.3.0-beta.1`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.3.0-beta.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorBetaParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0-beta.1",
      version: "1.3.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.3.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v1.3.0-beta.1`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.3.0-beta.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0-alpha.1",
      version: "1.3.0-alpha.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0-beta.1",
      version: "1.3.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.3.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.3.0-alpha.1...v1.3.0-beta.1`](https://github.com/user-id/repo-name/compare/v1.3.0-alpha.1...v1.3.0-beta.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorBetaParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0-alpha.1",
      version: "1.3.0-alpha.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0-beta.1",
      version: "1.3.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.3.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.3.0-alpha.1...v1.3.0-beta.1`](https://github.com/user-id/repo-name/compare/v1.3.0-alpha.1...v1.3.0-beta.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: mockedPatchLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v0.0.1-beta.1",
      version: "0.0.1-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "v0.0.1-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "beta",
    commits: [...mockedPatchLevelParsedCommitsInMonorepo, mockedPatchBetaParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v0.0.1-beta.1",
      version: "0.0.1-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "v0.0.1-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "beta",
    commits: mockedPatchLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.1-beta.1",
      version: "1.2.1-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.2.1-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v1.2.1-beta.1`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.2.1-beta.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: [...mockedPatchLevelParsedCommitsInMonorepo, mockedPatchBetaParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.1-beta.1",
      version: "1.2.1-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.2.1-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v1.2.1-beta.1`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.2.1-beta.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: mockedPatchLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.1-alpha.1",
      version: "1.2.1-alpha.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.1-beta.1",
      version: "1.2.1-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.2.1-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.1-alpha.1...v1.2.1-beta.1`](https://github.com/user-id/repo-name/compare/v1.2.1-alpha.1...v1.2.1-beta.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: [...mockedPatchLevelParsedCommitsInMonorepo, mockedPatchBetaParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.1-alpha.1",
      version: "1.2.1-alpha.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.1-beta.1",
      version: "1.2.1-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.2.1-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.1-alpha.1...v1.2.1-beta.1`](https://github.com/user-id/repo-name/compare/v1.2.1-alpha.1...v1.2.1-beta.1)"
      }
    }
  },
  {
    branch: "next",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.0.0-rc.1",
      version: "1.0.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.0.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorNextParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.0.0-rc.1",
      version: "1.0.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.0.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "next",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0-rc.1",
      version: "2.0.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v2.0.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v2.0.0-rc.1`](https://github.com/user-id/repo-name/compare/v1.2.0...v2.0.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorNextParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0-rc.1",
      version: "2.0.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v2.0.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v2.0.0-rc.1`](https://github.com/user-id/repo-name/compare/v1.2.0...v2.0.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0-alpha.1",
      version: "2.0.0-alpha.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0-rc.1",
      version: "2.0.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v2.0.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v2.0.0-alpha.1...v2.0.0-rc.1`](https://github.com/user-id/repo-name/compare/v2.0.0-alpha.1...v2.0.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorNextParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0-alpha.1",
      version: "2.0.0-alpha.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0-rc.1",
      version: "2.0.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v2.0.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v2.0.0-alpha.1...v2.0.0-rc.1`](https://github.com/user-id/repo-name/compare/v2.0.0-alpha.1...v2.0.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0-beta.1",
      version: "2.0.0-beta.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0-rc.1",
      version: "2.0.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v2.0.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v2.0.0-beta.1...v2.0.0-rc.1`](https://github.com/user-id/repo-name/compare/v2.0.0-beta.1...v2.0.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorNextParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0-beta.1",
      version: "2.0.0-beta.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v2.0.0-rc.1",
      version: "2.0.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v2.0.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))",
          "**node:** drop support for Node 16 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v2.0.0-beta.1...v2.0.0-rc.1`](https://github.com/user-id/repo-name/compare/v2.0.0-beta.1...v2.0.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v0.1.0-rc.1",
      version: "0.1.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v0.1.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorNextParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v0.1.0-rc.1",
      version: "0.1.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v0.1.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "next",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0-rc.1",
      version: "1.3.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.3.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v1.3.0-rc.1`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.3.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorNextParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0-rc.1",
      version: "1.3.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.3.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v1.3.0-rc.1`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.3.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0-alpha.1",
      version: "1.3.0-alpha.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0-rc.1",
      version: "1.3.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.3.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.3.0-alpha.1...v1.3.0-rc.1`](https://github.com/user-id/repo-name/compare/v1.3.0-alpha.1...v1.3.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorNextParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0-alpha.1",
      version: "1.3.0-alpha.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0-rc.1",
      version: "1.3.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.3.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.3.0-alpha.1...v1.3.0-rc.1`](https://github.com/user-id/repo-name/compare/v1.3.0-alpha.1...v1.3.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0-beta.1",
      version: "1.3.0-beta.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0-rc.1",
      version: "1.3.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.3.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.3.0-beta.1...v1.3.0-rc.1`](https://github.com/user-id/repo-name/compare/v1.3.0-beta.1...v1.3.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorNextParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0-beta.1",
      version: "1.3.0-beta.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.3.0-rc.1",
      version: "1.3.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.3.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))",
          "**github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/user-id/repo-name/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.3.0-beta.1...v1.3.0-rc.1`](https://github.com/user-id/repo-name/compare/v1.3.0-beta.1...v1.3.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: mockedPatchLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v0.0.1-rc.1",
      version: "0.0.1-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v0.0.1-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedPatchLevelParsedCommitsInMonorepo, mockedPatchNextParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v0.0.1-rc.1",
      version: "0.0.1-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v0.0.1-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ]
      }
    }
  },
  {
    branch: "next",
    commits: mockedPatchLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.1-rc.1",
      version: "1.2.1-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.2.1-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v1.2.1-rc.1`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.2.1-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedPatchLevelParsedCommitsInMonorepo, mockedPatchNextParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.1-rc.1",
      version: "1.2.1-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.2.1-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.0...v1.2.1-rc.1`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.2.1-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: mockedPatchLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.1-alpha.1",
      version: "1.2.1-alpha.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.1-rc.1",
      version: "1.2.1-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.2.1-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.1-alpha.1...v1.2.1-rc.1`](https://github.com/user-id/repo-name/compare/v1.2.1-alpha.1...v1.2.1-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedPatchLevelParsedCommitsInMonorepo, mockedPatchNextParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.1-alpha.1",
      version: "1.2.1-alpha.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.1-rc.1",
      version: "1.2.1-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.2.1-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.1-alpha.1...v1.2.1-rc.1`](https://github.com/user-id/repo-name/compare/v1.2.1-alpha.1...v1.2.1-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: mockedPatchLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.1-beta.1",
      version: "1.2.1-beta.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.1-rc.1",
      version: "1.2.1-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.2.1-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.1-beta.1...v1.2.1-rc.1`](https://github.com/user-id/repo-name/compare/v1.2.1-beta.1...v1.2.1-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedPatchLevelParsedCommitsInMonorepo, mockedPatchNextParsedReleaseCommit],
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.1-beta.1",
      version: "1.2.1-beta.1"
    },
    nextReleasePackage: {
      name: "",
      pathname: ".",
      gitTag: "v1.2.1-rc.1",
      version: "1.2.1-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "v1.2.1-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))",
          "**release:** display root when package name is an empty string ([`f0c9a2a`](https://github.com/user-id/repo-name/commit/f0c9a2ae78d036bbe7d329c9c715e5369857ec0b))"
        ],
        changelog:
          "**Full changelog:** [`v1.2.1-beta.1...v1.2.1-rc.1`](https://github.com/user-id/repo-name/compare/v1.2.1-beta.1...v1.2.1-rc.1)"
      }
    }
  },
  {
    branch: "main",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.0.0",
      version: "1.0.0"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.0.0",
      target: "main",
      isPrerelease: false,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ]
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.0",
        version: "1.0.0"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.0.0",
      version: "1.0.0"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.0.0",
      target: "main",
      isPrerelease: false,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.0"]
      }
    }
  },
  {
    branch: "main",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0",
      version: "2.0.0"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v2.0.0",
      target: "main",
      isPrerelease: false,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v2.0.0`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v2.0.0)"
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.0",
        version: "1.0.0"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0",
      version: "2.0.0"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v2.0.0",
      target: "main",
      isPrerelease: false,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.0"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v2.0.0`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v2.0.0)"
      }
    }
  },
  {
    branch: "main",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0-alpha.1",
      version: "1.2.0-alpha.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0",
      version: "2.0.0"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v2.0.0",
      target: "main",
      isPrerelease: false,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0-alpha.1...@monorepo/a@v2.0.0`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0-alpha.1...%40monorepo%2Fa%40v2.0.0)"
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.0",
        version: "1.0.0"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0-alpha.1",
      version: "1.2.0-alpha.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0",
      version: "2.0.0"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v2.0.0",
      target: "main",
      isPrerelease: false,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.0"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0-alpha.1...@monorepo/a@v2.0.0`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0-alpha.1...%40monorepo%2Fa%40v2.0.0)"
      }
    }
  },
  {
    branch: "main",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0-beta.1",
      version: "1.2.0-beta.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0",
      version: "2.0.0"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v2.0.0",
      target: "main",
      isPrerelease: false,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0-beta.1...@monorepo/a@v2.0.0`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0-beta.1...%40monorepo%2Fa%40v2.0.0)"
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.0",
        version: "1.0.0"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0-beta.1",
      version: "1.2.0-beta.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0",
      version: "2.0.0"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v2.0.0",
      target: "main",
      isPrerelease: false,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.0"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0-beta.1...@monorepo/a@v2.0.0`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0-beta.1...%40monorepo%2Fa%40v2.0.0)"
      }
    }
  },
  {
    branch: "main",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0-rc.1",
      version: "1.2.0-rc.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0",
      version: "2.0.0"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v2.0.0",
      target: "main",
      isPrerelease: false,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0-rc.1...@monorepo/a@v2.0.0`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0-rc.1...%40monorepo%2Fa%40v2.0.0)"
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.0",
        version: "1.0.0"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0-rc.1",
      version: "1.2.0-rc.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0",
      version: "2.0.0"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v2.0.0",
      target: "main",
      isPrerelease: false,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.0"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0-rc.1...@monorepo/a@v2.0.0`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0-rc.1...%40monorepo%2Fa%40v2.0.0)"
      }
    }
  },
  {
    branch: "main",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v0.1.0",
      version: "0.1.0"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v0.1.0",
      target: "main",
      isPrerelease: false,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ]
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.1.0",
        version: "1.1.0"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v0.1.0",
      version: "0.1.0"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v0.1.0",
      target: "main",
      isPrerelease: false,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.1.0"]
      }
    }
  },
  {
    branch: "main",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.3.0",
      version: "1.3.0"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.3.0",
      target: "main",
      isPrerelease: false,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v1.3.0`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v1.3.0)"
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.1.0",
        version: "1.1.0"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.3.0",
      version: "1.3.0"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.3.0",
      target: "main",
      isPrerelease: false,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.1.0"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v1.3.0`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v1.3.0)"
      }
    }
  },
  {
    branch: "main",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0-alpha.1",
      version: "1.2.0-alpha.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.2.0",
      target: "main",
      isPrerelease: false,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0-alpha.1...@monorepo/a@v1.2.0`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0-alpha.1...%40monorepo%2Fa%40v1.2.0)"
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.1.0",
        version: "1.1.0"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0-alpha.1",
      version: "1.2.0-alpha.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.2.0",
      target: "main",
      isPrerelease: false,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.1.0"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0-alpha.1...@monorepo/a@v1.2.0`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0-alpha.1...%40monorepo%2Fa%40v1.2.0)"
      }
    }
  },
  {
    branch: "main",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0-beta.1",
      version: "1.2.0-beta.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.2.0",
      target: "main",
      isPrerelease: false,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0-beta.1...@monorepo/a@v1.2.0`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0-beta.1...%40monorepo%2Fa%40v1.2.0)"
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.1.0",
        version: "1.1.0"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0-beta.1",
      version: "1.2.0-beta.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.2.0",
      target: "main",
      isPrerelease: false,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.1.0"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0-beta.1...@monorepo/a@v1.2.0`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0-beta.1...%40monorepo%2Fa%40v1.2.0)"
      }
    }
  },
  {
    branch: "main",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0-rc.1",
      version: "1.2.0-rc.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.2.0",
      target: "main",
      isPrerelease: false,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0-rc.1...@monorepo/a@v1.2.0`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0-rc.1...%40monorepo%2Fa%40v1.2.0)"
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.1.0",
        version: "1.1.0"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0-rc.1",
      version: "1.2.0-rc.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.2.0",
      target: "main",
      isPrerelease: false,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.1.0"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0-rc.1...@monorepo/a@v1.2.0`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0-rc.1...%40monorepo%2Fa%40v1.2.0)"
      }
    }
  },
  {
    branch: "main",
    commits: mockedPatchLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v0.0.1",
      version: "0.0.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v0.0.1",
      target: "main",
      isPrerelease: false,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ]
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedPatchLevelParsedCommitsInMonorepo, mockedPatchParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.1",
        version: "1.0.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v0.0.1",
      version: "0.0.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v0.0.1",
      target: "main",
      isPrerelease: false,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.1"]
      }
    }
  },
  {
    branch: "main",
    commits: mockedPatchLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.1",
      version: "1.2.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.2.1",
      target: "main",
      isPrerelease: false,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v1.2.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v1.2.1)"
      }
    }
  },
  {
    branch: "main",
    commits: [...mockedPatchLevelParsedCommitsInMonorepo, mockedPatchParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.1",
        version: "1.0.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.1",
      version: "1.2.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.2.1",
      target: "main",
      isPrerelease: false,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.1"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v1.2.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v1.2.1)"
      }
    }
  },
  {
    branch: "alpha",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.0.0-alpha.1",
      version: "1.0.0-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.0.0-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ]
      }
    }
  },
  {
    branch: "alpha",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorAlphaParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.0-alpha.1",
        version: "1.0.0-alpha.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.0.0-alpha.1",
      version: "1.0.0-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.0.0-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.0-alpha.1"]
      }
    }
  },
  {
    branch: "alpha",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0-alpha.1",
      version: "2.0.0-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v2.0.0-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v2.0.0-alpha.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v2.0.0-alpha.1)"
      }
    }
  },
  {
    branch: "alpha",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorAlphaParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.0-alpha.1",
        version: "1.0.0-alpha.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0-alpha.1",
      version: "2.0.0-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v2.0.0-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.0-alpha.1"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v2.0.0-alpha.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v2.0.0-alpha.1)"
      }
    }
  },
  {
    branch: "alpha",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v0.1.0-alpha.1",
      version: "0.1.0-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v0.1.0-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ]
      }
    }
  },
  {
    branch: "alpha",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorAlphaParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.1.0-alpha.1",
        version: "1.1.0-alpha.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v0.1.0-alpha.1",
      version: "0.1.0-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v0.1.0-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.1.0-alpha.1"]
      }
    }
  },
  {
    branch: "alpha",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.3.0-alpha.1",
      version: "1.3.0-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.3.0-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v1.3.0-alpha.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v1.3.0-alpha.1)"
      }
    }
  },
  {
    branch: "alpha",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorAlphaParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.1.0-alpha.1",
        version: "1.1.0-alpha.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.3.0-alpha.1",
      version: "1.3.0-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.3.0-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.1.0-alpha.1"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v1.3.0-alpha.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v1.3.0-alpha.1)"
      }
    }
  },
  {
    branch: "alpha",
    commits: mockedPatchLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v0.0.1-alpha.1",
      version: "0.0.1-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v0.0.1-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ]
      }
    }
  },
  {
    branch: "alpha",
    commits: [...mockedPatchLevelParsedCommitsInMonorepo, mockedPatchAlphaParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.1-alpha.1",
        version: "1.0.1-alpha.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v0.0.1-alpha.1",
      version: "0.0.1-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v0.0.1-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.1-alpha.1"]
      }
    }
  },
  {
    branch: "alpha",
    commits: mockedPatchLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.1-alpha.1",
      version: "1.2.1-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.2.1-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v1.2.1-alpha.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v1.2.1-alpha.1)"
      }
    }
  },
  {
    branch: "alpha",
    commits: [...mockedPatchLevelParsedCommitsInMonorepo, mockedPatchAlphaParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.1-alpha.1",
        version: "1.0.1-alpha.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.1-alpha.1",
      version: "1.2.1-alpha.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.2.1-alpha.1",
      target: "alpha",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.1-alpha.1"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v1.2.1-alpha.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v1.2.1-alpha.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.0.0-beta.1",
      version: "1.0.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.0.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ]
      }
    }
  },
  {
    branch: "beta",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorBetaParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.0-beta.1",
        version: "1.0.0-beta.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.0.0-beta.1",
      version: "1.0.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.0.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.0-beta.1"]
      }
    }
  },
  {
    branch: "beta",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0-beta.1",
      version: "2.0.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v2.0.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v2.0.0-beta.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v2.0.0-beta.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorBetaParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.0-beta.1",
        version: "1.0.0-beta.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0-beta.1",
      version: "2.0.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v2.0.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.0-beta.1"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v2.0.0-beta.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v2.0.0-beta.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0-alpha.1",
      version: "2.0.0-alpha.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0-beta.1",
      version: "2.0.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v2.0.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v2.0.0-alpha.1...@monorepo/a@v2.0.0-beta.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v2.0.0-alpha.1...%40monorepo%2Fa%40v2.0.0-beta.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorBetaParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.0-beta.1",
        version: "1.0.0-beta.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0-alpha.1",
      version: "2.0.0-alpha.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0-beta.1",
      version: "2.0.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v2.0.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.0-beta.1"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v2.0.0-alpha.1...@monorepo/a@v2.0.0-beta.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v2.0.0-alpha.1...%40monorepo%2Fa%40v2.0.0-beta.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v0.1.0-beta.1",
      version: "0.1.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v0.1.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ]
      }
    }
  },
  {
    branch: "beta",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorBetaParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.1.0-beta.1",
        version: "1.1.0-beta.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v0.1.0-beta.1",
      version: "0.1.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v0.1.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.1.0-beta.1"]
      }
    }
  },
  {
    branch: "beta",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.3.0-beta.1",
      version: "1.3.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.3.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v1.3.0-beta.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v1.3.0-beta.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorBetaParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.1.0-beta.1",
        version: "1.1.0-beta.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.3.0-beta.1",
      version: "1.3.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.3.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.1.0-beta.1"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v1.3.0-beta.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v1.3.0-beta.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.3.0-alpha.1",
      version: "1.3.0-alpha.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.3.0-beta.1",
      version: "1.3.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.3.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.3.0-alpha.1...@monorepo/a@v1.3.0-beta.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.3.0-alpha.1...%40monorepo%2Fa%40v1.3.0-beta.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorBetaParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.1.0-beta.1",
        version: "1.1.0-beta.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.3.0-alpha.1",
      version: "1.3.0-alpha.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.3.0-beta.1",
      version: "1.3.0-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.3.0-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.1.0-beta.1"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.3.0-alpha.1...@monorepo/a@v1.3.0-beta.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.3.0-alpha.1...%40monorepo%2Fa%40v1.3.0-beta.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: mockedPatchLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v0.0.1-beta.1",
      version: "0.0.1-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v0.0.1-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ]
      }
    }
  },
  {
    branch: "beta",
    commits: [...mockedPatchLevelParsedCommitsInMonorepo, mockedPatchBetaParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.1-beta.1",
        version: "1.0.1-beta.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v0.0.1-beta.1",
      version: "0.0.1-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v0.0.1-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.1-beta.1"]
      }
    }
  },
  {
    branch: "beta",
    commits: mockedPatchLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.1-beta.1",
      version: "1.2.1-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.2.1-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v1.2.1-beta.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v1.2.1-beta.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: [...mockedPatchLevelParsedCommitsInMonorepo, mockedPatchBetaParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.1-beta.1",
        version: "1.0.1-beta.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.1-beta.1",
      version: "1.2.1-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.2.1-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.1-beta.1"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v1.2.1-beta.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v1.2.1-beta.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: mockedPatchLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.1-alpha.1",
      version: "1.2.1-alpha.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.1-beta.1",
      version: "1.2.1-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.2.1-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.1-alpha.1...@monorepo/a@v1.2.1-beta.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.1-alpha.1...%40monorepo%2Fa%40v1.2.1-beta.1)"
      }
    }
  },
  {
    branch: "beta",
    commits: [...mockedPatchLevelParsedCommitsInMonorepo, mockedPatchBetaParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.1-beta.1",
        version: "1.0.1-beta.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.1-alpha.1",
      version: "1.2.1-alpha.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.1-beta.1",
      version: "1.2.1-beta.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.2.1-beta.1",
      target: "beta",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.1-beta.1"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.1-alpha.1...@monorepo/a@v1.2.1-beta.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.1-alpha.1...%40monorepo%2Fa%40v1.2.1-beta.1)"
      }
    }
  },
  {
    branch: "next",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.0.0-rc.1",
      version: "1.0.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.0.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ]
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorNextParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.0-rc.1",
        version: "1.0.0-rc.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.0.0-rc.1",
      version: "1.0.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.0.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.0-rc.1"]
      }
    }
  },
  {
    branch: "next",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0-rc.1",
      version: "2.0.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v2.0.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v2.0.0-rc.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v2.0.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorNextParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.0-rc.1",
        version: "1.0.0-rc.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0-rc.1",
      version: "2.0.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v2.0.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.0-rc.1"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v2.0.0-rc.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v2.0.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0-alpha.1",
      version: "2.0.0-alpha.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0-rc.1",
      version: "2.0.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v2.0.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v2.0.0-alpha.1...@monorepo/a@v2.0.0-rc.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v2.0.0-alpha.1...%40monorepo%2Fa%40v2.0.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorNextParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.0-rc.1",
        version: "1.0.0-rc.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0-alpha.1",
      version: "2.0.0-alpha.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0-rc.1",
      version: "2.0.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v2.0.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.0-rc.1"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v2.0.0-alpha.1...@monorepo/a@v2.0.0-rc.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v2.0.0-alpha.1...%40monorepo%2Fa%40v2.0.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: mockedMajorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0-beta.1",
      version: "2.0.0-beta.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0-rc.1",
      version: "2.0.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v2.0.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v2.0.0-beta.1...@monorepo/a@v2.0.0-rc.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v2.0.0-beta.1...%40monorepo%2Fa%40v2.0.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedMajorLevelParsedCommitsInMonorepo, mockedMajorNextParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.0-rc.1",
        version: "1.0.0-rc.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0-beta.1",
      version: "2.0.0-beta.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v2.0.0-rc.1",
      version: "2.0.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v2.0.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        major: [
          "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
        ],
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.0-rc.1"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v2.0.0-beta.1...@monorepo/a@v2.0.0-rc.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v2.0.0-beta.1...%40monorepo%2Fa%40v2.0.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v0.1.0-rc.1",
      version: "0.1.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v0.1.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ]
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorNextParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.1.0-rc.1",
        version: "1.1.0-rc.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v0.1.0-rc.1",
      version: "0.1.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v0.1.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.1.0-rc.1"]
      }
    }
  },
  {
    branch: "next",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.3.0-rc.1",
      version: "1.3.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.3.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v1.3.0-rc.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v1.3.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorNextParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.1.0-rc.1",
        version: "1.1.0-rc.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.3.0-rc.1",
      version: "1.3.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.3.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.1.0-rc.1"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v1.3.0-rc.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v1.3.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.3.0-alpha.1",
      version: "1.3.0-alpha.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.3.0-rc.1",
      version: "1.3.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.3.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.3.0-alpha.1...@monorepo/a@v1.3.0-rc.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.3.0-alpha.1...%40monorepo%2Fa%40v1.3.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorNextParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.1.0-rc.1",
        version: "1.1.0-rc.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.3.0-alpha.1",
      version: "1.3.0-alpha.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.3.0-rc.1",
      version: "1.3.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.3.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.1.0-rc.1"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.3.0-alpha.1...@monorepo/a@v1.3.0-rc.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.3.0-alpha.1...%40monorepo%2Fa%40v1.3.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: mockedMinorLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.3.0-beta.1",
      version: "1.3.0-beta.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.3.0-rc.1",
      version: "1.3.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.3.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.3.0-beta.1...@monorepo/a@v1.3.0-rc.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.3.0-beta.1...%40monorepo%2Fa%40v1.3.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedMinorLevelParsedCommitsInMonorepo, mockedMinorNextParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.1.0-rc.1",
        version: "1.1.0-rc.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.3.0-beta.1",
      version: "1.3.0-beta.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.3.0-rc.1",
      version: "1.3.0-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.3.0-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        minor: [
          "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
        ],
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.1.0-rc.1"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.3.0-beta.1...@monorepo/a@v1.3.0-rc.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.3.0-beta.1...%40monorepo%2Fa%40v1.3.0-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: mockedPatchLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v0.0.1-rc.1",
      version: "0.0.1-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v0.0.1-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ]
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedPatchLevelParsedCommitsInMonorepo, mockedPatchNextParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.1-rc.1",
        version: "1.0.1-rc.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: null,
      version: "0.0.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v0.0.1-rc.1",
      version: "0.0.1-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v0.0.1-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.1-rc.1"]
      }
    }
  },
  {
    branch: "next",
    commits: mockedPatchLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.1-rc.1",
      version: "1.2.1-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.2.1-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v1.2.1-rc.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v1.2.1-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedPatchLevelParsedCommitsInMonorepo, mockedPatchNextParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.1-rc.1",
        version: "1.0.1-rc.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.0",
      version: "1.2.0"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.1-rc.1",
      version: "1.2.1-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.2.1-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.1-rc.1"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.0...@monorepo/a@v1.2.1-rc.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.0...%40monorepo%2Fa%40v1.2.1-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: mockedPatchLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.1-alpha.1",
      version: "1.2.1-alpha.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.1-rc.1",
      version: "1.2.1-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.2.1-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.1-alpha.1...@monorepo/a@v1.2.1-rc.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.1-alpha.1...%40monorepo%2Fa%40v1.2.1-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedPatchLevelParsedCommitsInMonorepo, mockedPatchNextParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.1-rc.1",
        version: "1.0.1-rc.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.1-alpha.1",
      version: "1.2.1-alpha.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.1-rc.1",
      version: "1.2.1-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.2.1-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.1-rc.1"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.1-alpha.1...@monorepo/a@v1.2.1-rc.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.1-alpha.1...%40monorepo%2Fa%40v1.2.1-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: mockedPatchLevelParsedCommitsInMonorepo,
    packageDependencies: [],
    nextReleasePackageDependencies: [],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.1-beta.1",
      version: "1.2.1-beta.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.1-rc.1",
      version: "1.2.1-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.2.1-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.1-beta.1...@monorepo/a@v1.2.1-rc.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.1-beta.1...%40monorepo%2Fa%40v1.2.1-rc.1)"
      }
    }
  },
  {
    branch: "next",
    commits: [...mockedPatchLevelParsedCommitsInMonorepo, mockedPatchNextParsedReleaseCommit],
    packageDependencies: ["@monorepo/c"],
    nextReleasePackageDependencies: [
      {
        name: "@monorepo/c",
        pathname: "packages/c",
        gitTag: "@monorepo/c@v1.0.1-rc.1",
        version: "1.0.1-rc.1"
      }
    ],
    lastReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.1-beta.1",
      version: "1.2.1-beta.1"
    },
    nextReleasePackage: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.2.1-rc.1",
      version: "1.2.1-rc.1"
    },
    expectedReleaseNotes: {
      tagName: "@monorepo/a@v1.2.1-rc.1",
      target: "next",
      isPrerelease: true,
      body: {
        patch: [
          "**release:** add exit code in case the pathname is not found ([`4013e0f`](https://github.com/user-id/repo-name/commit/4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5))"
        ],
        dependencies: ["@monorepo/c@1.0.1-rc.1"],
        changelog:
          "**Full changelog:** [`@monorepo/a@v1.2.1-beta.1...@monorepo/a@v1.2.1-rc.1`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v1.2.1-beta.1...%40monorepo%2Fa%40v1.2.1-rc.1)"
      }
    }
  }
];
