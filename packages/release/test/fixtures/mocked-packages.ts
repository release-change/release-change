import { mockedContext, mockedContextInMonorepo } from "./mocked-context.js";

export const mockedPackages = [
  {
    context: mockedContext,
    branch: "main",
    packages: [{ name: "", pathname: "." }],
    packageVersions: [{ name: "", version: "1.0.0", pathname: "/fake/path/package.json" }],
    expectedLastRelease: {
      ref: "v2.0.0",
      packages: [{ name: "", pathname: ".", gitTag: "v2.0.0", version: "2.0.0" }]
    },
    expectedLastReleaseWithoutGitTags: {
      ref: null,
      packages: [{ name: "", pathname: ".", gitTag: null, version: "1.0.0" }]
    },
    expectedLastReleaseWithoutAnything: {
      ref: null,
      packages: [{ name: "", pathname: ".", gitTag: null, version: "0.0.0" }]
    }
  },
  {
    context: mockedContext,
    branch: "next",
    packages: [{ name: "", pathname: "." }],
    packageVersions: [{ name: "", version: "1.0.0", pathname: "/fake/path/package.json" }],
    expectedLastRelease: {
      ref: "v2.0.0-rc.2",
      packages: [{ name: "", pathname: ".", gitTag: "v2.0.0-rc.2", version: "2.0.0-rc.2" }]
    },
    expectedLastReleaseWithoutGitTags: {
      ref: null,
      packages: [{ name: "", pathname: ".", gitTag: null, version: "1.0.0" }]
    },
    expectedLastReleaseWithoutAnything: {
      ref: null,
      packages: [{ name: "", pathname: ".", gitTag: null, version: "0.0.0" }]
    }
  },
  {
    context: mockedContext,
    branch: "beta",
    packages: [{ name: "", pathname: "." }],
    packageVersions: [{ name: "", version: "1.0.0", pathname: "/fake/path/package.json" }],
    expectedLastRelease: {
      ref: "v2.0.0-beta.3",
      packages: [{ name: "", pathname: ".", gitTag: "v2.0.0-beta.3", version: "2.0.0-beta.3" }]
    },
    expectedLastReleaseWithoutGitTags: {
      ref: null,
      packages: [{ name: "", pathname: ".", gitTag: null, version: "1.0.0" }]
    },
    expectedLastReleaseWithoutAnything: {
      ref: null,
      packages: [{ name: "", pathname: ".", gitTag: null, version: "0.0.0" }]
    }
  },
  {
    context: mockedContext,
    branch: "alpha",
    packages: [{ name: "", pathname: "." }],
    packageVersions: [{ name: "", version: "1.0.0", pathname: "/fake/path/package.json" }],
    expectedLastRelease: {
      ref: "v2.0.0-alpha.4",
      packages: [{ name: "", pathname: ".", gitTag: "v2.0.0-alpha.4", version: "2.0.0-alpha.4" }]
    },
    expectedLastReleaseWithoutGitTags: {
      ref: null,
      packages: [{ name: "", pathname: ".", gitTag: null, version: "1.0.0" }]
    },
    expectedLastReleaseWithoutAnything: {
      ref: null,
      packages: [{ name: "", pathname: ".", gitTag: null, version: "0.0.0" }]
    }
  },
  {
    context: mockedContextInMonorepo,
    branch: "main",
    packages: [
      { name: "", pathname: "." },
      { name: "@monorepo/a", pathname: "packages/a" },
      { name: "@monorepo/b", pathname: "packages/b" },
      { name: "@monorepo/c", pathname: "packages/c" }
    ],
    packageVersions: [
      { name: "", version: "1.0.0", pathname: "/fake/path/package.json" },
      { name: "@monorepo/a", version: "1.0.0", pathname: "/fake/path/packages/a/package.json" },
      { name: "@monorepo/b", version: "1.0.0", pathname: "/fake/path/packages/b/package.json" },
      { name: "@monorepo/c", version: "1.0.0", pathname: "/fake/path/packages/c/package.json" }
    ],
    expectedLastRelease: {
      ref: "v2.0.0",
      packages: [
        { name: "", pathname: ".", gitTag: "v2.0.0", version: "2.0.0" },
        {
          name: "@monorepo/a",
          pathname: "packages/a",
          gitTag: "@monorepo/a@v2.0.0",
          version: "2.0.0"
        },
        {
          name: "@monorepo/b",
          pathname: "packages/b",
          gitTag: "@monorepo/b@v2.0.0",
          version: "2.0.0"
        },
        { name: "@monorepo/c", pathname: "packages/c", gitTag: null, version: "0.0.0" }
      ]
    },
    expectedLastReleaseWithoutGitTags: {
      ref: null,
      packages: [
        { name: "", pathname: ".", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/a", pathname: "packages/a", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/b", pathname: "packages/b", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/c", pathname: "packages/c", gitTag: null, version: "1.0.0" }
      ]
    },
    expectedLastReleaseWithoutAnything: {
      ref: null,
      packages: [
        { name: "", pathname: ".", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/a", pathname: "packages/a", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/b", pathname: "packages/b", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/c", pathname: "packages/c", gitTag: null, version: "0.0.0" }
      ]
    }
  },
  {
    context: mockedContextInMonorepo,
    branch: "next",
    packages: [
      { name: "", pathname: "." },
      { name: "@monorepo/a", pathname: "packages/a" },
      { name: "@monorepo/b", pathname: "packages/b" },
      { name: "@monorepo/c", pathname: "packages/c" }
    ],
    packageVersions: [
      { name: "", version: "1.0.0", pathname: "/fake/path/package.json" },
      { name: "@monorepo/a", version: "1.0.0", pathname: "/fake/path/packages/a/package.json" },
      { name: "@monorepo/b", version: "1.0.0", pathname: "/fake/path/packages/b/package.json" },
      { name: "@monorepo/c", version: "1.0.0", pathname: "/fake/path/packages/c/package.json" }
    ],
    expectedLastRelease: {
      ref: "v2.0.0-rc.2",
      packages: [
        { name: "", pathname: ".", gitTag: "v2.0.0-rc.2", version: "2.0.0-rc.2" },
        {
          name: "@monorepo/a",
          pathname: "packages/a",
          gitTag: "@monorepo/a@v2.0.0-rc.2",
          version: "2.0.0-rc.2"
        },
        {
          name: "@monorepo/b",
          pathname: "packages/b",
          gitTag: "@monorepo/b@v2.0.0-rc.2",
          version: "2.0.0-rc.2"
        },
        { name: "@monorepo/c", pathname: "packages/c", gitTag: null, version: "0.0.0" }
      ]
    },
    expectedLastReleaseWithoutGitTags: {
      ref: null,
      packages: [
        { name: "", pathname: ".", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/a", pathname: "packages/a", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/b", pathname: "packages/b", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/c", pathname: "packages/c", gitTag: null, version: "1.0.0" }
      ]
    },
    expectedLastReleaseWithoutAnything: {
      ref: null,
      packages: [
        { name: "", pathname: ".", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/a", pathname: "packages/a", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/b", pathname: "packages/b", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/c", pathname: "packages/c", gitTag: null, version: "0.0.0" }
      ]
    }
  },
  {
    context: mockedContextInMonorepo,
    branch: "beta",
    packages: [
      { name: "", pathname: "." },
      { name: "@monorepo/a", pathname: "packages/a" },
      { name: "@monorepo/b", pathname: "packages/b" },
      { name: "@monorepo/c", pathname: "packages/c" }
    ],
    packageVersions: [
      { name: "", version: "1.0.0", pathname: "/fake/path/package.json" },
      { name: "@monorepo/a", version: "1.0.0", pathname: "/fake/path/packages/a/package.json" },
      { name: "@monorepo/b", version: "1.0.0", pathname: "/fake/path/packages/b/package.json" },
      { name: "@monorepo/c", version: "1.0.0", pathname: "/fake/path/packages/c/package.json" }
    ],
    expectedLastRelease: {
      ref: "v2.0.0-beta.3",
      packages: [
        { name: "", pathname: ".", gitTag: "v2.0.0-beta.3", version: "2.0.0-beta.3" },
        {
          name: "@monorepo/a",
          pathname: "packages/a",
          gitTag: "@monorepo/a@v2.0.0-beta.3",
          version: "2.0.0-beta.3"
        },
        {
          name: "@monorepo/b",
          pathname: "packages/b",
          gitTag: "@monorepo/b@v2.0.0-beta.3",
          version: "2.0.0-beta.3"
        },
        { name: "@monorepo/c", pathname: "packages/c", gitTag: null, version: "0.0.0" }
      ]
    },
    expectedLastReleaseWithoutGitTags: {
      ref: null,
      packages: [
        { name: "", pathname: ".", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/a", pathname: "packages/a", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/b", pathname: "packages/b", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/c", pathname: "packages/c", gitTag: null, version: "1.0.0" }
      ]
    },
    expectedLastReleaseWithoutAnything: {
      ref: null,
      packages: [
        { name: "", pathname: ".", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/a", pathname: "packages/a", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/b", pathname: "packages/b", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/c", pathname: "packages/c", gitTag: null, version: "0.0.0" }
      ]
    }
  },
  {
    context: mockedContextInMonorepo,
    branch: "alpha",
    packages: [
      { name: "", pathname: "." },
      { name: "@monorepo/a", pathname: "packages/a" },
      { name: "@monorepo/b", pathname: "packages/b" },
      { name: "@monorepo/c", pathname: "packages/c" }
    ],
    packageVersions: [
      { name: "", version: "1.0.0", pathname: "/fake/path/package.json" },
      { name: "@monorepo/a", version: "1.0.0", pathname: "/fake/path/packages/a/package.json" },
      { name: "@monorepo/b", version: "1.0.0", pathname: "/fake/path/packages/b/package.json" },
      { name: "@monorepo/c", version: "1.0.0", pathname: "/fake/path/packages/c/package.json" }
    ],
    expectedLastRelease: {
      ref: "v2.0.0-alpha.4",
      packages: [
        { name: "", pathname: ".", gitTag: "v2.0.0-alpha.4", version: "2.0.0-alpha.4" },
        {
          name: "@monorepo/a",
          pathname: "packages/a",
          gitTag: "@monorepo/a@v2.0.0-alpha.4",
          version: "2.0.0-alpha.4"
        },
        {
          name: "@monorepo/b",
          pathname: "packages/b",
          gitTag: "@monorepo/b@v2.0.0-alpha.4",
          version: "2.0.0-alpha.4"
        },
        { name: "@monorepo/c", pathname: "packages/c", gitTag: null, version: "0.0.0" }
      ]
    },
    expectedLastReleaseWithoutGitTags: {
      ref: null,
      packages: [
        { name: "", pathname: ".", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/a", pathname: "packages/a", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/b", pathname: "packages/b", gitTag: null, version: "1.0.0" },
        { name: "@monorepo/c", pathname: "packages/c", gitTag: null, version: "1.0.0" }
      ]
    },
    expectedLastReleaseWithoutAnything: {
      ref: null,
      packages: [
        { name: "", pathname: ".", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/a", pathname: "packages/a", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/b", pathname: "packages/b", gitTag: null, version: "0.0.0" },
        { name: "@monorepo/c", pathname: "packages/c", gitTag: null, version: "0.0.0" }
      ]
    }
  }
];
