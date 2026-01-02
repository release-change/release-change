import type { Reference, ReleaseInfo } from "@release-change/shared";

export const mockedSuccessComments: {
  type: "issue" | "pull request";
  isMonorepo: boolean;
  reference: Reference;
  releaseInfos: ReleaseInfo[];
  expectedBody: string;
}[] = [
  {
    type: "issue",
    isMonorepo: false,
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.2.3"]
    },
    releaseInfos: [],
    expectedBody: `#### The release succeeded

This issue has been resolved in version 1.2.3.`
  },
  {
    type: "pull request",
    isMonorepo: false,
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.2.3"]
    },
    releaseInfos: [],
    expectedBody: `#### The release succeeded

This pull request is included in version 1.2.3.`
  },
  {
    type: "issue",
    isMonorepo: true,
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.2.3", "@monorepo/a@v1.2.3"]
    },
    releaseInfos: [],
    expectedBody: `#### The release succeeded

This issue has been resolved in versions 1.2.3 of root package and 1.2.3 of @monorepo/a package.`
  },
  {
    type: "pull request",
    isMonorepo: true,
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.2.3", "@monorepo/a@v1.2.3"]
    },
    releaseInfos: [],
    expectedBody: `#### The release succeeded

This pull request is included in versions 1.2.3 of root package and 1.2.3 of @monorepo/a package.`
  },
  {
    type: "issue",
    isMonorepo: false,
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.2.3"]
    },
    releaseInfos: [
      {
        type: "github",
        name: "GitHub release",
        url: "https://github.com/user-id/repo-name/releases/tag/v1.2.3"
      }
    ],
    expectedBody: `#### The release succeeded

This issue has been resolved in version 1.2.3.

The release is available on [GitHub release](https://github.com/user-id/repo-name/releases/tag/v1.2.3).`
  },
  {
    type: "pull request",
    isMonorepo: false,
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.2.3"]
    },
    releaseInfos: [
      {
        type: "github",
        name: "GitHub release",
        url: "https://github.com/user-id/repo-name/releases/tag/v1.2.3"
      }
    ],
    expectedBody: `#### The release succeeded

This pull request is included in version 1.2.3.

The release is available on [GitHub release](https://github.com/user-id/repo-name/releases/tag/v1.2.3).`
  },
  {
    type: "issue",
    isMonorepo: true,
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.2.3", "@monorepo/a@v1.2.3"]
    },
    releaseInfos: [
      {
        type: "github",
        name: "GitHub release",
        url: "https://github.com/user-id/repo-name/releases/tag/v1.2.3"
      },
      {
        type: "github",
        name: "GitHub release",
        url: "https://github.com/user-id/repo-name/releases/tag/@monorepo/a@v1.2.3"
      }
    ],
    expectedBody: `#### The release succeeded

This issue has been resolved in versions 1.2.3 of root package and 1.2.3 of @monorepo/a package.

##### 1.2.3

The release is available on [GitHub release](https://github.com/user-id/repo-name/releases/tag/v1.2.3).

##### @monorepo/a@1.2.3

The release is available on [GitHub release](https://github.com/user-id/repo-name/releases/tag/@monorepo/a@v1.2.3).`
  },
  {
    type: "pull request",
    isMonorepo: true,
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.2.3", "@monorepo/a@v1.2.3"]
    },
    releaseInfos: [
      {
        type: "github",
        name: "GitHub release",
        url: "https://github.com/user-id/repo-name/releases/tag/v1.2.3"
      },
      {
        type: "github",
        name: "GitHub release",
        url: "https://github.com/user-id/repo-name/releases/tag/@monorepo/a@v1.2.3"
      }
    ],
    expectedBody: `#### The release succeeded

This pull request is included in versions 1.2.3 of root package and 1.2.3 of @monorepo/a package.

##### 1.2.3

The release is available on [GitHub release](https://github.com/user-id/repo-name/releases/tag/v1.2.3).

##### @monorepo/a@1.2.3

The release is available on [GitHub release](https://github.com/user-id/repo-name/releases/tag/@monorepo/a@v1.2.3).`
  },
  {
    type: "issue",
    isMonorepo: false,
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.2.3"]
    },
    releaseInfos: [
      {
        type: "npm",
        name: "NPM (latest distribution tag)",
        url: "https://npmjs.com/package/foo/v/1.2.3"
      }
    ],
    expectedBody: `#### The release succeeded

This issue has been resolved in version 1.2.3.

The release is available on [NPM (latest distribution tag)](https://npmjs.com/package/foo/v/1.2.3).`
  },
  {
    type: "pull request",
    isMonorepo: false,
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.2.3"]
    },
    releaseInfos: [
      {
        type: "npm",
        name: "NPM (latest distribution tag)",
        url: "https://npmjs.com/package/foo/v/1.2.3"
      }
    ],
    expectedBody: `#### The release succeeded

This pull request is included in version 1.2.3.

The release is available on [NPM (latest distribution tag)](https://npmjs.com/package/foo/v/1.2.3).`
  },
  {
    type: "issue",
    isMonorepo: true,
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.2.3", "@monorepo/a@v1.2.3"]
    },
    releaseInfos: [
      {
        type: "npm",
        name: "NPM (latest distribution tag)",
        url: "https://npmjs.com/package/@monorepo/a/v/1.2.3"
      }
    ],
    expectedBody: `#### The release succeeded

This issue has been resolved in versions 1.2.3 of root package and 1.2.3 of @monorepo/a package.

##### @monorepo/a@1.2.3

The release is available on [NPM (latest distribution tag)](https://npmjs.com/package/@monorepo/a/v/1.2.3).`
  },
  {
    type: "pull request",
    isMonorepo: true,
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.2.3", "@monorepo/a@v1.2.3"]
    },
    releaseInfos: [
      {
        type: "npm",
        name: "NPM (latest distribution tag)",
        url: "https://npmjs.com/package/@monorepo/a/v/1.2.3"
      }
    ],
    expectedBody: `#### The release succeeded

This pull request is included in versions 1.2.3 of root package and 1.2.3 of @monorepo/a package.

##### @monorepo/a@1.2.3

The release is available on [NPM (latest distribution tag)](https://npmjs.com/package/@monorepo/a/v/1.2.3).`
  },
  {
    type: "issue",
    isMonorepo: false,
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.2.3"]
    },
    releaseInfos: [
      {
        type: "github",
        name: "GitHub release",
        url: "https://github.com/user-id/repo-name/releases/tag/v1.2.3"
      },
      {
        type: "npm",
        name: "NPM (latest distribution tag)",
        url: "https://npmjs.com/package/foo/v/1.2.3"
      }
    ],
    expectedBody: `#### The release succeeded

This issue has been resolved in version 1.2.3.

The release is available on:
- [GitHub release](https://github.com/user-id/repo-name/releases/tag/v1.2.3),
- [NPM (latest distribution tag)](https://npmjs.com/package/foo/v/1.2.3).`
  },
  {
    type: "pull request",
    isMonorepo: false,
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.2.3"]
    },
    releaseInfos: [
      {
        type: "github",
        name: "GitHub release",
        url: "https://github.com/user-id/repo-name/releases/tag/v1.2.3"
      },
      {
        type: "npm",
        name: "NPM (latest distribution tag)",
        url: "https://npmjs.com/package/foo/v/1.2.3"
      }
    ],
    expectedBody: `#### The release succeeded

This pull request is included in version 1.2.3.

The release is available on:
- [GitHub release](https://github.com/user-id/repo-name/releases/tag/v1.2.3),
- [NPM (latest distribution tag)](https://npmjs.com/package/foo/v/1.2.3).`
  },
  {
    type: "issue",
    isMonorepo: true,
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.2.3", "@monorepo/a@v1.2.3"]
    },
    releaseInfos: [
      {
        type: "github",
        name: "GitHub release",
        url: "https://github.com/user-id/repo-name/releases/tag/v1.2.3"
      },
      {
        type: "github",
        name: "GitHub release",
        url: "https://github.com/user-id/repo-name/releases/tag/@monorepo/a@v1.2.3"
      },
      {
        type: "npm",
        name: "NPM (latest distribution tag)",
        url: "https://npmjs.com/package/@monorepo/a/v/1.2.3"
      }
    ],
    expectedBody: `#### The release succeeded

This issue has been resolved in versions 1.2.3 of root package and 1.2.3 of @monorepo/a package.

##### 1.2.3

The release is available on [GitHub release](https://github.com/user-id/repo-name/releases/tag/v1.2.3).

##### @monorepo/a@1.2.3

The release is available on:
- [GitHub release](https://github.com/user-id/repo-name/releases/tag/@monorepo/a@v1.2.3),
- [NPM (latest distribution tag)](https://npmjs.com/package/@monorepo/a/v/1.2.3).`
  },
  {
    type: "pull request",
    isMonorepo: true,
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.2.3", "@monorepo/a@v1.2.3"]
    },
    releaseInfos: [
      {
        type: "github",
        name: "GitHub release",
        url: "https://github.com/user-id/repo-name/releases/tag/v1.2.3"
      },
      {
        type: "github",
        name: "GitHub release",
        url: "https://github.com/user-id/repo-name/releases/tag/@monorepo/a@v1.2.3"
      },
      {
        type: "npm",
        name: "NPM (latest distribution tag)",
        url: "https://npmjs.com/package/@monorepo/a/v/1.2.3"
      }
    ],
    expectedBody: `#### The release succeeded

This pull request is included in versions 1.2.3 of root package and 1.2.3 of @monorepo/a package.

##### 1.2.3

The release is available on [GitHub release](https://github.com/user-id/repo-name/releases/tag/v1.2.3).

##### @monorepo/a@1.2.3

The release is available on:
- [GitHub release](https://github.com/user-id/repo-name/releases/tag/@monorepo/a@v1.2.3),
- [NPM (latest distribution tag)](https://npmjs.com/package/@monorepo/a/v/1.2.3).`
  }
];
