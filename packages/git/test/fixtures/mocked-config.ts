import { mockedRepositoryUrl } from "./mocked-repository-url.js";

export const mockedConfig = {
  branches: ["main"],
  releaseType: {
    main: {
      channel: "latest"
    }
  },
  isMonorepo: false,
  dependencyUpdateMethod: null,
  debug: false,
  dryRun: false,
  repositoryUrl: mockedRepositoryUrl,
  remoteName: "origin"
};
export const mockedConfigInMonorepo = { ...mockedConfig, isMonorepo: true };
