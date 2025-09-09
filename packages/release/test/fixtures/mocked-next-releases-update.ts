export const mockedNextReleases = [
  {
    packageName: "root package",
    packagePath: "/fake/path/package.json",
    nextRelease: {
      name: "",
      gitTag: "v1.3.0",
      version: "1.3.0"
    }
  },
  {
    packageName: "@monorepo/a package",
    packagePath: "/fake/path/packages/a/package.json",
    nextRelease: {
      name: "@monorepo/a",
      gitTag: "v1.2.3",
      version: "1.2.3"
    }
  },
  {
    packageName: "@monorepo/b package",
    packagePath: "/fake/path/packages/b/package.json",
    nextRelease: {
      name: "@monorepo/b",
      gitTag: "v1.0.0",
      version: "1.0.0"
    }
  }
];
