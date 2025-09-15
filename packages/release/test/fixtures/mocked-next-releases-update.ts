export const mockedNextReleases = [
  {
    packageName: "root package",
    packagePath: ".",
    packageManifestPath: "/fake/path/package.json",
    nextRelease: {
      name: "",
      path: ".",
      gitTag: "v1.3.0",
      version: "1.3.0"
    }
  },
  {
    packageName: "@monorepo/a package",
    packagePath: "packages/a",
    packageManifestPath: "/fake/path/packages/a/package.json",
    nextRelease: {
      name: "@monorepo/a",
      path: "packages/a",
      gitTag: "@monorepo/a@v1.2.3",
      version: "1.2.3"
    }
  },
  {
    packageName: "@monorepo/b package",
    packagePath: "packages/b",
    packageManifestPath: "/fake/path/packages/b/package.json",
    nextRelease: {
      name: "@monorepo/b",
      path: "packages/b",
      gitTag: "@monorepo/b@v1.0.0",
      version: "1.0.0"
    }
  }
];
