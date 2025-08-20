import type { Config } from "@release-change/shared";

import { mockedRepositoryUrl } from "./mocked-repository-url.js";

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
  debug: false,
  dryRun: false,
  repositoryUrl: mockedRepositoryUrl,
  remoteName: "origin"
};
