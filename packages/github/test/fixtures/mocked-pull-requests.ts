export const mockedPullRequests = [
  {
    isMonorepo: false,
    isAutoMerge: false,
    nextRelease: [],
    expectedTitle: "chore: release version package [skip ci]",
    expectedBody: `This pull request was automatically created.

The auto-merge is disabled. Please merge this pull request manually.
`
  },
  {
    isMonorepo: false,
    isAutoMerge: true,
    nextRelease: [],
    expectedTitle: "chore: release version package [skip ci]",
    expectedBody: `This pull request was automatically created.

The auto-merge is enabled.
`
  },
  {
    isMonorepo: false,
    isAutoMerge: false,
    nextRelease: [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.2.3",
        version: "1.2.3"
      }
    ],
    expectedTitle: "chore: release version package [skip ci]",
    expectedBody: `This pull request was automatically created.

The auto-merge is disabled. Please merge this pull request manually.

#### Releases

- v1.2.3
`
  },
  {
    isMonorepo: false,
    isAutoMerge: true,
    nextRelease: [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.2.3",
        version: "1.2.3"
      }
    ],
    expectedTitle: "chore: release version package [skip ci]",
    expectedBody: `This pull request was automatically created.

The auto-merge is enabled.

#### Releases

- v1.2.3
`
  },
  {
    isMonorepo: true,
    isAutoMerge: false,
    nextRelease: [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.2.3",
        version: "1.2.3"
      },
      {
        name: "@monorepo/a",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v1.2.3",
        version: "1.2.3"
      }
    ],
    expectedTitle: "chore: release version packages [skip ci]",
    expectedBody: `This pull request was automatically created.

The auto-merge is disabled. Please merge this pull request manually.

#### Releases

- v1.2.3
- @monorepo/a@v1.2.3
`
  },
  {
    isMonorepo: true,
    isAutoMerge: true,
    nextRelease: [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.2.3",
        version: "1.2.3"
      },
      {
        name: "@monorepo/a",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v1.2.3",
        version: "1.2.3"
      }
    ],
    expectedTitle: "chore: release version packages [skip ci]",
    expectedBody: `This pull request was automatically created.

The auto-merge is enabled.

#### Releases

- v1.2.3
- @monorepo/a@v1.2.3
`
  }
];
