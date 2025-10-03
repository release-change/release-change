export const mockedPullRequestsAndIssuesToTag = [
  {
    isMonorepo: false,
    type: "pull request",
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.2.3"]
    },
    nextRelease: [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.2.3",
        version: "1.2.3"
      }
    ],
    expectedLabels: ["released"]
  },
  {
    isMonorepo: false,
    type: "issue",
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.2.3"]
    },
    nextRelease: [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.2.3",
        version: "1.2.3"
      }
    ],
    expectedLabels: ["released"]
  },
  {
    isMonorepo: false,
    type: "pull request",
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.0.0-alpha.1"]
    },
    nextRelease: [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.0.0-alpha.1",
        version: "1.0.0-alpha.1",
        npmTag: "alpha"
      }
    ],
    expectedLabels: ["released on @alpha"]
  },
  {
    isMonorepo: false,
    type: "issue",
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.0.0-alpha.1"]
    },
    nextRelease: [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.0.0-alpha.1",
        version: "1.0.0-alpha.1",
        npmTag: "alpha"
      }
    ],
    expectedLabels: ["released on @alpha"]
  },
  {
    isMonorepo: false,
    type: "pull request",
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.0.0-beta.1"]
    },
    nextRelease: [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.0.0-beta.1",
        version: "1.0.0-beta.1",
        npmTag: "beta"
      }
    ],
    expectedLabels: ["released on @beta"]
  },
  {
    isMonorepo: false,
    type: "issue",
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.0.0-beta.1"]
    },
    nextRelease: [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.0.0-beta.1",
        version: "1.0.0-beta.1",
        npmTag: "beta"
      }
    ],
    expectedLabels: ["released on @beta"]
  },
  {
    isMonorepo: false,
    type: "pull request",
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.0.0-rc.1"]
    },
    nextRelease: [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.0.0-rc.1",
        version: "1.0.0-rc.1",
        npmTag: "next"
      }
    ],
    expectedLabels: ["released on @next"]
  },
  {
    isMonorepo: false,
    type: "issue",
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.0.0-rc.1"]
    },
    nextRelease: [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.0.0-rc.1",
        version: "1.0.0-rc.1",
        npmTag: "next"
      }
    ],
    expectedLabels: ["released on @next"]
  },
  {
    isMonorepo: true,
    type: "pull request",
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.2.3", "@monorepo/a@v1.1.0"]
    },
    nextRelease: [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.2.3",
        version: "1.2.3"
      },
      {
        name: "@monorepo/@",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v1.1.0",
        version: "1.1.0"
      }
    ],
    expectedLabels: ["released"]
  },
  {
    isMonorepo: true,
    type: "issue",
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.2.3", "@monorepo/a@v1.1.0"]
    },
    nextRelease: [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.2.3",
        version: "1.2.3"
      },
      {
        name: "@monorepo/@",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v1.1.0",
        version: "1.1.0"
      }
    ],
    expectedLabels: ["released"]
  },
  {
    isMonorepo: true,
    type: "pull request",
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.0.0-alpha.1", "@monorepo/a@v1.0.0-alpha.1"]
    },
    nextRelease: [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.0.0-alpha.1",
        version: "1.0.0-alpha.1",
        npmTag: "alpha"
      },
      {
        name: "@monorepo/a",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v1.0.0-alpha.1",
        version: "1.0.0-alpha.1",
        npmTag: "alpha"
      }
    ],
    expectedLabels: ["released on @alpha"]
  },
  {
    isMonorepo: true,
    type: "issue",
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.0.0-alpha.1", "@monorepo/a@v1.0.0-alpha.1"]
    },
    nextRelease: [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.0.0-alpha.1",
        version: "1.0.0-alpha.1",
        npmTag: "alpha"
      },
      {
        name: "@monorepo/a",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v1.0.0-alpha.1",
        version: "1.0.0-alpha.1",
        npmTag: "alpha"
      }
    ],
    expectedLabels: ["released on @alpha"]
  },
  {
    isMonorepo: true,
    type: "pull request",
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.0.0-beta.1", "@monorepo/a@v1.0.0-beta.1"]
    },
    nextRelease: [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.0.0-beta.1",
        version: "1.0.0-beta.1",
        npmTag: "beta"
      },
      {
        name: "@monorepo/a",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v1.0.0-beta.1",
        version: "1.0.0-beta.1",
        npmTag: "beta"
      }
    ],
    expectedLabels: ["released on @beta"]
  },
  {
    isMonorepo: true,
    type: "issue",
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.0.0-beta.1", "@monorepo/a@v1.0.0-beta.1"]
    },
    nextRelease: [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.0.0-beta.1",
        version: "1.0.0-beta.1",
        npmTag: "beta"
      },
      {
        name: "@monorepo/a",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v1.0.0-beta.1",
        version: "1.0.0-beta.1",
        npmTag: "beta"
      }
    ],
    expectedLabels: ["released on @beta"]
  },
  {
    isMonorepo: true,
    type: "pull request",
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.0.0-rc.1", "@monorepo/a@v1.0.0-rc.1"]
    },
    nextRelease: [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.0.0-rc.1",
        version: "1.0.0-rc.1",
        npmTag: "next"
      },
      {
        name: "@monorepo/a",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v1.0.0-rc.1",
        version: "1.0.0-rc.1",
        npmTag: "next"
      }
    ],
    expectedLabels: ["released on @next"]
  },
  {
    isMonorepo: true,
    type: "issue",
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.0.0-rc.1", "@monorepo/a@v1.0.0-rc.1"]
    },
    nextRelease: [
      {
        name: "",
        pathname: ".",
        gitTag: "v1.0.0-rc.1",
        version: "1.0.0-rc.1",
        npmTag: "next"
      },
      {
        name: "@monorepo/a",
        pathname: "packages/a",
        gitTag: "@monorepo/a@v1.0.0-rc.1",
        version: "1.0.0-rc.1",
        npmTag: "next"
      }
    ],
    expectedLabels: ["released on @next"]
  },
  {
    isMonorepo: true,
    type: "pull request",
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.2.3", "@monorepo/a@v1.0.0-alpha.1"]
    },
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
        gitTag: "@monorepo/a@v1.0.0-alpha.1",
        version: "1.0.0-alpha.1",
        npmTag: "alpha"
      }
    ],
    expectedLabels: ["released", "released on @alpha"]
  },
  {
    isMonorepo: true,
    type: "issue",
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.2.3", "@monorepo/a@v1.0.0-alpha.1"]
    },
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
        gitTag: "@monorepo/a@v1.0.0-alpha.1",
        version: "1.0.0-alpha.1",
        npmTag: "alpha"
      }
    ],
    expectedLabels: ["released", "released on @alpha"]
  },
  {
    isMonorepo: true,
    type: "pull request",
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.2.3", "@monorepo/a@v1.0.0-beta.1"]
    },
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
        gitTag: "@monorepo/a@v1.0.0-beta.1",
        version: "1.0.0-beta.1",
        npmTag: "beta"
      }
    ],
    expectedLabels: ["released", "released on @beta"]
  },
  {
    isMonorepo: true,
    type: "issue",
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.2.3", "@monorepo/a@v1.0.0-beta.1"]
    },
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
        gitTag: "@monorepo/a@v1.0.0-beta.1",
        version: "1.0.0-beta.1",
        npmTag: "beta"
      }
    ],
    expectedLabels: ["released", "released on @beta"]
  },
  {
    isMonorepo: true,
    type: "pull request",
    reference: {
      number: 123,
      isPullRequest: true,
      gitTags: ["v1.2.3", "@monorepo/a@v1.0.0-rc.1"]
    },
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
        gitTag: "@monorepo/a@v1.0.0-rc.1",
        version: "1.0.0-rc.1",
        npmTag: "next"
      }
    ],
    expectedLabels: ["released", "released on @next"]
  },
  {
    isMonorepo: true,
    type: "issue",
    reference: {
      number: 123,
      isPullRequest: false,
      gitTags: ["v1.2.3", "@monorepo/a@v1.0.0-rc.1"]
    },
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
        gitTag: "@monorepo/a@v1.0.0-rc.1",
        version: "1.0.0-rc.1",
        npmTag: "next"
      }
    ],
    expectedLabels: ["released", "released on @next"]
  }
];
