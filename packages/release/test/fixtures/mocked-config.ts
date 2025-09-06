import type { Config } from "@release-change/shared";

import { mockedRepositoryUrl } from "../../../cli/test/fixtures/mocked-repository-url.js";

export const mockedConfig: Config = {
  branches: ["alpha", "beta", "main", "master", "next"],
  releaseType: {
    alpha: {
      channel: "alpha",
      prerelease: true,
      prereleaseIdentifier: "alpha"
    },
    beta: {
      channel: "beta",
      prerelease: true,
      prereleaseIdentifier: "beta"
    },
    main: {
      channel: "default"
    },
    next: {
      channel: "next",
      prerelease: true,
      prereleaseIdentifier: "rc"
    }
  },
  isMonorepo: false,
  dependencyUpdateMethod: null,
  debug: false,
  dryRun: false,
  repositoryUrl: mockedRepositoryUrl,
  remoteName: "origin"
};
