export const mockedChangelogFiles = [
  {
    nextRelease: {
      name: "",
      pathname: ".",
      gitTag: "v1.0.0",
      version: "1.0.0"
    },
    packageName: "my-package",
    path: "/fake/path/CHANGELOG.md",
    releaseNotesBody: {
      major: [
        "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
      ],
      minor: [
        "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
      ],
      patch: [
        "**release:** add exit code in case the pathname is not found ([`cfd9eed`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))"
      ],
      changelog:
        "**Full changelog:** [`v0.1.0...v1.0.0`](https://github.com/user-id/repo-name/compare/v0.1.0...v1.0.0)"
    },
    releaseNotesBodyWithoutChangelog: {
      major: [
        "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
      ],
      minor: [
        "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
      ],
      patch: [
        "**release:** add exit code in case the pathname is not found ([`cfd9eed`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))"
      ]
    },
    formattedReleaseNotesBody: `### Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

### Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

### Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v0.1.0...v1.0.0\`](https://github.com/user-id/repo-name/compare/v0.1.0...v1.0.0)
`,
    formattedReleaseNotesBodyWithoutFullChangelog: `### Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

### Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

### Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))
`,
    existingChangelogFile: `# my-package

## 0.1.0

### Minor changes

- initial commit ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))
`,
    expectedNewChangelogFile: `# my-package

## 1.0.0

### Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

### Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

### Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))
`,
    expectedUpdatedChangelogFile: `# my-package

## 1.0.0

### Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

### Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

### Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

---

**Full changelog:** [\`v0.1.0...v1.0.0\`](https://github.com/user-id/repo-name/compare/v0.1.0...v1.0.0)

## 0.1.0

### Minor changes

- initial commit ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))
`
  },
  {
    nextRelease: {
      name: "@monorepo/a",
      pathname: "packages/a",
      gitTag: "@monorepo/a@v1.0.0",
      version: "1.0.0"
    },
    packageName: "@monorepo/a",
    path: "/fake/path/packages/a/CHANGELOG.md",
    releaseNotesBody: {
      major: [
        "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
      ],
      minor: [
        "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
      ],
      patch: [
        "**release:** add exit code in case the pathname is not found ([`cfd9eed`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))"
      ],
      dependencies: ["@monorepo/c@1.0.0"],
      changelog:
        "**Full changelog:** [`@monorepo/a@v0.1.0...@monorepo/a@v1.0.0`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v0.1.0...%40monorepo%2Fa%40v1.0.0)"
    },
    releaseNotesBodyWithoutChangelog: {
      major: [
        "**node:** drop support for Node 18 ([`d652880`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))"
      ],
      minor: [
        "**release:** set last release ([`08a2eba`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))"
      ],
      patch: [
        "**release:** add exit code in case the pathname is not found ([`cfd9eed`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))"
      ],
      dependencies: ["@monorepo/c@1.0.0"]
    },
    formattedReleaseNotesBody: `### Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

### Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

### Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

### Dependencies updates

- @monorepo/c@1.0.0

---

**Full changelog:** [\`@monorepo/a@v0.1.0...@monorepo/a@v1.0.0\`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v0.1.0...%40monorepo%2Fa%40v1.0.0)
`,
    formattedReleaseNotesBodyWithoutFullChangelog: `### Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

### Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

### Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

### Dependencies updates

- @monorepo/c@1.0.0
`,
    existingChangelogFile: `# @monorepo/a

## 0.1.0

### Minor changes

- initial commit ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))
`,
    expectedNewChangelogFile: `# @monorepo/a

## 1.0.0

### Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

### Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

### Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

### Dependencies updates

- @monorepo/c@1.0.0
`,
    expectedUpdatedChangelogFile: `# @monorepo/a

## 1.0.0

### Major changes

- **node:** drop support for Node 18 ([\`d652880\`](https://github.com/user-id/repo-name/commit/d652880132e1100d4c8cf6a3540019b7b094fcf3))

### Minor changes

- **release:** set last release ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))

### Patch changes

- **release:** add exit code in case the pathname is not found ([\`cfd9eed\`](https://github.com/user-id/repo-name/commit/cfd9eed163fb42c64ffcd9c163e4462553cec335))

### Dependencies updates

- @monorepo/c@1.0.0

---

**Full changelog:** [\`@monorepo/a@v0.1.0...@monorepo/a@v1.0.0\`](https://github.com/user-id/repo-name/compare/%40monorepo%2Fa%40v0.1.0...%40monorepo%2Fa%40v1.0.0)

## 0.1.0

### Minor changes

- initial commit ([\`08a2eba\`](https://github.com/user-id/repo-name/commit/08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67))
`
  }
];
