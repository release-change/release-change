export const mockedEnvs = [
  {
    ciEnvironment: "unknown",
    env: {},
    expectedConfig: {
      isCi: false,
      isPullRequest: false
    }
  },
  {
    ciEnvironment: "GitHub Actions on push event",
    env: {
      CI: "true",
      GITHUB_ACTIONS: "true",
      GITHUB_EVENT_NAME: "push"
    },
    expectedConfig: {
      isCi: true,
      isPullRequest: false
    }
  },
  {
    ciEnvironment: "GitHub Actions on pull_request event",
    env: {
      CI: "true",
      GITHUB_ACTIONS: "true",
      GITHUB_EVENT_NAME: "pull_request"
    },
    expectedConfig: {
      isCi: true,
      isPullRequest: true
    }
  },
  {
    ciEnvironment: "GitHub Actions on pull_request_target event",
    env: {
      CI: "true",
      GITHUB_ACTIONS: "true",
      GITHUB_EVENT_NAME: "pull_request_target"
    },
    expectedConfig: {
      isCi: true,
      isPullRequest: true
    }
  }
];
