import { mockedContext, mockedContextInMonorepo } from "./mocked-context.js";

export const mockedPackages = [
  {
    context: mockedContext,
    branch: "main",
    packages: [{ name: "", path: "." }],
    packageVersions: [{ name: "", version: "1.0.0", path: "/fake/path/package.json" }],
    expectedLastRelease: {
      ref: "v2.0.0",
      packages: [{ name: "", path: ".", gitTag: "v2.0.0", version: "2.0.0" }]
    },
    expectedLastReleaseWithoutGitTags: {
      ref: null,
      packages: [{ name: "", path: ".", gitTag: null, version: "1.0.0" }]
    },
    expectedLastReleaseWithoutAnything: {
      ref: null,
      packages: [{ name: "", path: ".", gitTag: null, version: "0.0.0" }]
    }
  },
  {
    context: mockedContext,
    branch: "next",
    packages: [{ name: "", path: "." }],
    packageVersions: [{ name: "", version: "1.0.0", path: "/fake/path/package.json" }],
    expectedLastRelease: {
      ref: "v2.0.0-rc.2",
      packages: [{ name: "", path: ".", gitTag: "v2.0.0-rc.2", version: "2.0.0-rc.2" }]
    },
    expectedLastReleaseWithoutGitTags: {
      ref: null,
      packages: [{ name: "", path: ".", gitTag: null, version: "1.0.0" }]
    },
    expectedLastReleaseWithoutAnything: {
      ref: null,
      packages: [{ name: "", path: ".", gitTag: null, version: "0.0.0" }]
    }
  },
  {
    context: mockedContext,
    branch: "beta",
    packages: [{ name: "", path: "." }],
    packageVersions: [{ name: "", version: "1.0.0", path: "/fake/path/package.json" }],
    expectedLastRelease: {
      ref: "v2.0.0-beta.3",
      packages: [{ name: "", path: ".", gitTag: "v2.0.0-beta.3", version: "2.0.0-beta.3" }]
    },
    expectedLastReleaseWithoutGitTags: {
      ref: null,
      packages: [{ name: "", path: ".", gitTag: null, version: "1.0.0" }]
    },
    expectedLastReleaseWithoutAnything: {
      ref: null,
      packages: [{ name: "", path: ".", gitTag: null, version: "0.0.0" }]
    }
  },
  {
    context: mockedContext,
    branch: "alpha",
    packages: [{ name: "", path: "." }],
    packageVersions: [{ name: "", version: "1.0.0", path: "/fake/path/package.json" }],
    expectedLastRelease: {
      ref: "v2.0.0-alpha.4",
      packages: [{ name: "", path: ".", gitTag: "v2.0.0-alpha.4", version: "2.0.0-alpha.4" }]
    },
    expectedLastReleaseWithoutGitTags: {
      ref: null,
      packages: [{ name: "", path: ".", gitTag: null, version: "1.0.0" }]
    },
    expectedLastReleaseWithoutAnything: {
      ref: null,
      packages: [{ name: "", path: ".", gitTag: null, version: "0.0.0" }]
    }
  },
  {
    context: mockedContextInMonorepo,
    branch: "main",
    packages: [
      { name: "", path: "." },
      { name: "@monorepo/a", path: "packages/a" },
      { name: "@monorepo/b", path: "packages/b" },
      { name: "@monorepo/c", path: "packages/c" }
    ],
    packageVersions: [
      { name: "", version: "1.0.0", path: "/fake/path/package.json" },
      { name: "@monorepo/a", version: "1.0.0", path: "/fake/path/packages/a/package.json" },
      { name: "@monorepo/b", version: "1.0.0", path: "/fake/path/packages/b/package.json" },
      { name: "@monorepo/c", version: "1.0.0", path: "/fake/path/packages/c/package.json" }
    ],
    expectedLastRelease: {
      ref: "v2.0.0",
      packages: [
        { name: "", path: ".", gitTag: "v2.0.0", version: "2.0.0" },
        { name: "@monorepo/a", path: "packages/a", gitTag: "@monorepo/a@v2.0.0", version: "2.0.0" },
        { name: "@monorepo/b", path: "packages/b", gitTag: "@monorepo/b@v2.0.0", version: "2.0.0" },
        { name: "@monorepo/c", path: "packages/c", gitTag: null, version: "0.0.0" }
      ]
    },
    expectedLastReleaseWithoutGitTags: {
      ref: null,
      packages: [
        { name: "", path: ".", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/a", path: "packages/a", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/b", path: "packages/b", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/c", path: "packages/c", gitTag: null, version: "1.0.0" }
      ]
    },
    expectedLastReleaseWithoutAnything: {
      ref: null,
      packages: [
        { name: "", path: ".", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/a", path: "packages/a", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/b", path: "packages/b", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/c", path: "packages/c", gitTag: null, version: "0.0.0" }
      ]
    }
  },
  {
    context: mockedContextInMonorepo,
    branch: "next",
    packages: [
      { name: "", path: "." },
      { name: "@monorepo/a", path: "packages/a" },
      { name: "@monorepo/b", path: "packages/b" },
      { name: "@monorepo/c", path: "packages/c" }
    ],
    packageVersions: [
      { name: "", version: "1.0.0", path: "/fake/path/package.json" },
      { name: "@monorepo/a", version: "1.0.0", path: "/fake/path/packages/a/package.json" },
      { name: "@monorepo/b", version: "1.0.0", path: "/fake/path/packages/b/package.json" },
      { name: "@monorepo/c", version: "1.0.0", path: "/fake/path/packages/c/package.json" }
    ],
    expectedLastRelease: {
      ref: "v2.0.0-rc.2",
      packages: [
        { name: "", path: ".", gitTag: "v2.0.0-rc.2", version: "2.0.0-rc.2" },
        {
          name: "@monorepo/a",
          path: "packages/a",
          gitTag: "@monorepo/a@v2.0.0-rc.2",
          version: "2.0.0-rc.2"
        },
        {
          name: "@monorepo/b",
          path: "packages/b",
          gitTag: "@monorepo/b@v2.0.0-rc.2",
          version: "2.0.0-rc.2"
        },
        { name: "@monorepo/c", path: "packages/c", gitTag: null, version: "0.0.0" }
      ]
    },
    expectedLastReleaseWithoutGitTags: {
      ref: null,
      packages: [
        { name: "", path: ".", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/a", path: "packages/a", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/b", path: "packages/b", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/c", path: "packages/c", gitTag: null, version: "1.0.0" }
      ]
    },
    expectedLastReleaseWithoutAnything: {
      ref: null,
      packages: [
        { name: "", path: ".", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/a", path: "packages/a", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/b", path: "packages/b", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/c", path: "packages/c", gitTag: null, version: "0.0.0" }
      ]
    }
  },
  {
    context: mockedContextInMonorepo,
    branch: "beta",
    packages: [
      { name: "", path: "." },
      { name: "@monorepo/a", path: "packages/a" },
      { name: "@monorepo/b", path: "packages/b" },
      { name: "@monorepo/c", path: "packages/c" }
    ],
    packageVersions: [
      { name: "", version: "1.0.0", path: "/fake/path/package.json" },
      { name: "@monorepo/a", version: "1.0.0", path: "/fake/path/packages/a/package.json" },
      { name: "@monorepo/b", version: "1.0.0", path: "/fake/path/packages/b/package.json" },
      { name: "@monorepo/c", version: "1.0.0", path: "/fake/path/packages/c/package.json" }
    ],
    expectedLastRelease: {
      ref: "v2.0.0-beta.3",
      packages: [
        { name: "", path: ".", gitTag: "v2.0.0-beta.3", version: "2.0.0-beta.3" },
        {
          name: "@monorepo/a",
          path: "packages/a",
          gitTag: "@monorepo/a@v2.0.0-beta.3",
          version: "2.0.0-beta.3"
        },
        {
          name: "@monorepo/b",
          path: "packages/b",
          gitTag: "@monorepo/b@v2.0.0-beta.3",
          version: "2.0.0-beta.3"
        },
        { name: "@monorepo/c", path: "packages/c", gitTag: null, version: "0.0.0" }
      ]
    },
    expectedLastReleaseWithoutGitTags: {
      ref: null,
      packages: [
        { name: "", path: ".", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/a", path: "packages/a", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/b", path: "packages/b", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/c", path: "packages/c", gitTag: null, version: "1.0.0" }
      ]
    },
    expectedLastReleaseWithoutAnything: {
      ref: null,
      packages: [
        { name: "", path: ".", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/a", path: "packages/a", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/b", path: "packages/b", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/c", path: "packages/c", gitTag: null, version: "0.0.0" }
      ]
    }
  },
  {
    context: mockedContextInMonorepo,
    branch: "alpha",
    packages: [
      { name: "", path: "." },
      { name: "@monorepo/a", path: "packages/a" },
      { name: "@monorepo/b", path: "packages/b" },
      { name: "@monorepo/c", path: "packages/c" }
    ],
    packageVersions: [
      { name: "", version: "1.0.0", path: "/fake/path/package.json" },
      { name: "@monorepo/a", version: "1.0.0", path: "/fake/path/packages/a/package.json" },
      { name: "@monorepo/b", version: "1.0.0", path: "/fake/path/packages/b/package.json" },
      { name: "@monorepo/c", version: "1.0.0", path: "/fake/path/packages/c/package.json" }
    ],
    expectedLastRelease: {
      ref: "v2.0.0-alpha.4",
      packages: [
        { name: "", path: ".", gitTag: "v2.0.0-alpha.4", version: "2.0.0-alpha.4" },
        {
          name: "@monorepo/a",
          path: "packages/a",
          gitTag: "@monorepo/a@v2.0.0-alpha.4",
          version: "2.0.0-alpha.4"
        },
        {
          name: "@monorepo/b",
          path: "packages/b",
          gitTag: "@monorepo/b@v2.0.0-alpha.4",
          version: "2.0.0-alpha.4"
        },
        { name: "@monorepo/c", path: "packages/c", gitTag: null, version: "0.0.0" }
      ]
    },
    expectedLastReleaseWithoutGitTags: {
      ref: null,
      packages: [
        { name: "", path: ".", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/a", path: "packages/a", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/b", path: "packages/b", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/c", path: "packages/c", gitTag: null, version: "1.0.0" }
      ]
    },
    expectedLastReleaseWithoutAnything: {
      ref: null,
      packages: [
        { name: "", path: ".", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/a", path: "packages/a", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/b", path: "packages/b", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/c", path: "packages/c", gitTag: null, version: "0.0.0" }
      ]
    }
  }
];
