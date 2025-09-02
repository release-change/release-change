const mockedRepositoryUrl = "https://github.com/user-id/repo-name.git";
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
