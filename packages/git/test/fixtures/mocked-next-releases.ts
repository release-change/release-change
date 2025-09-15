export const mockedNextReleases = [
  {
    packageName: "root package",
    nextRelease: {
      name: "",
      path: ".",
      gitTag: "v1.3.0",
      version: "1.3.0"
    }
  },
  {
    packageName: "@monorepo/a package",
    nextRelease: {
      name: "@monorepo/a",
      path: "packages/a",
      gitTag: "@monorepo/a@v1.2.3",
      version: "1.2.3"
    }
  },
  {
    packageName: "@monorepo/b package",
    nextRelease: {
      name: "@monorepo/b",
      path: "packages/b",
      gitTag: "@monorepo/b@v1.0.0",
      version: "1.0.0"
    }
  }
];
