import {
  mockedMajorLevelParsedCommits,
  mockedMinorLevelParsedCommits,
  mockedPatchLevelParsedCommits
} from "./mocked-parsed-commits.js";

export const mockedPackages = [
  {
    branch: "main",
    commits: mockedMajorLevelParsedCommits,
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
      body: `## Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))
`
    }
  },
  {
    branch: "main",
    commits: mockedMajorLevelParsedCommits,
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
      body: `## Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.2.0...v2.0.0\`](https://github.com/user-id/repo-name/compare/v1.2.0...v2.0.0)
`
    }
  },
  {
    branch: "main",
    commits: mockedMajorLevelParsedCommits,
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
      body: `## Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.2.0-alpha.1...v2.0.0\`](https://github.com/user-id/repo-name/compare/v1.2.0-alpha.1...v2.0.0)
`
    }
  },
  {
    branch: "main",
    commits: mockedMajorLevelParsedCommits,
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
      body: `## Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.2.0-beta.1...v2.0.0\`](https://github.com/user-id/repo-name/compare/v1.2.0-beta.1...v2.0.0)
`
    }
  },
  {
    branch: "main",
    commits: mockedMajorLevelParsedCommits,
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
      body: `## Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.2.0-rc.1...v2.0.0\`](https://github.com/user-id/repo-name/compare/v1.2.0-rc.1...v2.0.0)
`
    }
  },
  {
    branch: "main",
    commits: mockedMinorLevelParsedCommits,
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
      body: `## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))
`
    }
  },
  {
    branch: "main",
    commits: mockedMinorLevelParsedCommits,
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
      body: `## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.2.0...v1.3.0\`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.3.0)
`
    }
  },
  {
    branch: "main",
    commits: mockedMinorLevelParsedCommits,
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
      body: `## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.2.0-alpha.1...v1.2.0\`](https://github.com/user-id/repo-name/compare/v1.2.0-alpha.1...v1.2.0)
`
    }
  },
  {
    branch: "main",
    commits: mockedMinorLevelParsedCommits,
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
      body: `## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.2.0-beta.1...v1.2.0\`](https://github.com/user-id/repo-name/compare/v1.2.0-beta.1...v1.2.0)
`
    }
  },
  {
    branch: "main",
    commits: mockedMinorLevelParsedCommits,
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
      body: `## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.2.0-rc.1...v1.2.0\`](https://github.com/user-id/repo-name/compare/v1.2.0-rc.1...v1.2.0)
`
    }
  },
  {
    branch: "main",
    commits: mockedPatchLevelParsedCommits,
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
      body: `## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))
`
    }
  },
  {
    branch: "main",
    commits: mockedPatchLevelParsedCommits,
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
      body: `## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.2.0...v1.2.1\`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.2.1)
`
    }
  },
  {
    branch: "alpha",
    commits: mockedMajorLevelParsedCommits,
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
      body: `## Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))
`
    }
  },
  {
    branch: "alpha",
    commits: mockedMajorLevelParsedCommits,
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
      body: `## Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.2.0...v2.0.0-alpha.1\`](https://github.com/user-id/repo-name/compare/v1.2.0...v2.0.0-alpha.1)
`
    }
  },
  {
    branch: "alpha",
    commits: mockedMinorLevelParsedCommits,
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
      body: `## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))
`
    }
  },
  {
    branch: "alpha",
    commits: mockedMinorLevelParsedCommits,
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
      body: `## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.2.0...v1.3.0-alpha.1\`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.3.0-alpha.1)
`
    }
  },
  {
    branch: "alpha",
    commits: mockedPatchLevelParsedCommits,
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
      body: `## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))
`
    }
  },
  {
    branch: "alpha",
    commits: mockedPatchLevelParsedCommits,
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
      body: `## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.2.0...v1.2.1-alpha.1\`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.2.1-alpha.1)
`
    }
  },
  {
    branch: "beta",
    commits: mockedMajorLevelParsedCommits,
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
      body: `## Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))
`
    }
  },
  {
    branch: "beta",
    commits: mockedMajorLevelParsedCommits,
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
      body: `## Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.2.0...v2.0.0-beta.1\`](https://github.com/user-id/repo-name/compare/v1.2.0...v2.0.0-beta.1)
`
    }
  },
  {
    branch: "beta",
    commits: mockedMajorLevelParsedCommits,
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
      body: `## Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v2.0.0-alpha.1...v2.0.0-beta.1\`](https://github.com/user-id/repo-name/compare/v2.0.0-alpha.1...v2.0.0-beta.1)
`
    }
  },
  {
    branch: "beta",
    commits: mockedMinorLevelParsedCommits,
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
      body: `## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))
`
    }
  },
  {
    branch: "beta",
    commits: mockedMinorLevelParsedCommits,
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
      body: `## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.2.0...v1.3.0-beta.1\`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.3.0-beta.1)
`
    }
  },
  {
    branch: "beta",
    commits: mockedMinorLevelParsedCommits,
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
      body: `## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.3.0-alpha.1...v1.3.0-beta.1\`](https://github.com/user-id/repo-name/compare/v1.3.0-alpha.1...v1.3.0-beta.1)
`
    }
  },
  {
    branch: "beta",
    commits: mockedPatchLevelParsedCommits,
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
      body: `## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))
`
    }
  },
  {
    branch: "beta",
    commits: mockedPatchLevelParsedCommits,
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
      body: `## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.2.0...v1.2.1-beta.1\`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.2.1-beta.1)
`
    }
  },
  {
    branch: "beta",
    commits: mockedPatchLevelParsedCommits,
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
      body: `## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.2.1-alpha.1...v1.2.1-beta.1\`](https://github.com/user-id/repo-name/compare/v1.2.1-alpha.1...v1.2.1-beta.1)
`
    }
  },
  {
    branch: "next",
    commits: mockedMajorLevelParsedCommits,
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
      body: `## Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))
`
    }
  },
  {
    branch: "next",
    commits: mockedMajorLevelParsedCommits,
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
      body: `## Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.2.0...v2.0.0-rc.1\`](https://github.com/user-id/repo-name/compare/v1.2.0...v2.0.0-rc.1)
`
    }
  },
  {
    branch: "next",
    commits: mockedMajorLevelParsedCommits,
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
      body: `## Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v2.0.0-alpha.1...v2.0.0-rc.1\`](https://github.com/user-id/repo-name/compare/v2.0.0-alpha.1...v2.0.0-rc.1)
`
    }
  },
  {
    branch: "next",
    commits: mockedMajorLevelParsedCommits,
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
      body: `## Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v2.0.0-beta.1...v2.0.0-rc.1\`](https://github.com/user-id/repo-name/compare/v2.0.0-beta.1...v2.0.0-rc.1)
`
    }
  },
  {
    branch: "next",
    commits: mockedMinorLevelParsedCommits,
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
      body: `## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))
`
    }
  },
  {
    branch: "next",
    commits: mockedMinorLevelParsedCommits,
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
      body: `## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.2.0...v1.3.0-rc.1\`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.3.0-rc.1)
`
    }
  },
  {
    branch: "next",
    commits: mockedMinorLevelParsedCommits,
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
      body: `## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.3.0-alpha.1...v1.3.0-rc.1\`](https://github.com/user-id/repo-name/compare/v1.3.0-alpha.1...v1.3.0-rc.1)
`
    }
  },
  {
    branch: "next",
    commits: mockedMinorLevelParsedCommits,
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
      body: `## Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.3.0-beta.1...v1.3.0-rc.1\`](https://github.com/user-id/repo-name/compare/v1.3.0-beta.1...v1.3.0-rc.1)
`
    }
  },
  {
    branch: "next",
    commits: mockedPatchLevelParsedCommits,
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
      body: `## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))
`
    }
  },
  {
    branch: "next",
    commits: mockedPatchLevelParsedCommits,
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
      body: `## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.2.0...v1.2.1-rc.1\`](https://github.com/user-id/repo-name/compare/v1.2.0...v1.2.1-rc.1)
`
    }
  },
  {
    branch: "next",
    commits: mockedPatchLevelParsedCommits,
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
      body: `## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.2.1-alpha.1...v1.2.1-rc.1\`](https://github.com/user-id/repo-name/compare/v1.2.1-alpha.1...v1.2.1-rc.1)
`
    }
  },
  {
    branch: "next",
    commits: mockedPatchLevelParsedCommits,
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
      body: `## Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v1.2.1-beta.1...v1.2.1-rc.1\`](https://github.com/user-id/repo-name/compare/v1.2.1-beta.1...v1.2.1-rc.1)
`
    }
  }
];
