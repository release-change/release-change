export const mockedBranchNames = [
  {
    branch: "main",
    nextRelease: [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.3.0",
        version: "1.3.0"
      }
    ],
    expected: "release-change/main/1.3.0"
  },
  {
    branch: "main",
    nextRelease: [
      {
        name: "@monorepo/a",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v1.2.3",
        version: "1.2.3"
      }
    ],
    expected: "release-change/main/monorepo-a-1.2.3"
  },
  {
    branch: "alpha",
    nextRelease: [
      {
        name: "@monorepo/b",
        pathname: "packages/b",
        gitTag: "@monorepo/b@v1.0.0-alpha.1",
        version: "1.0.0-alpha.1"
      }
    ],
    expected: "release-change/alpha/monorepo-b-1.0.0-alpha.1"
  },
  {
    branch: "main",
    nextRelease: [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.3.0",
        version: "1.3.0"
      },
      {
        name: "@monorepo/a",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v1.2.3",
        version: "1.2.3"
      },
      {
        name: "@monorepo/b",
        pathname: "packages/b",
        gitTag: "@monorepo/b@v1.0.0",
        version: "1.0.0"
      }
    ],
    expected: "release-change/main/1.3.0_monorepo-a-1.2.3_monorepo-b-1.0.0"
  }
];
