import type { Context } from "@release-change/shared/";

import { mockedConfig, mockedConfigInMonorepo } from "./mocked-config.js";

export const mockedContext: Context = {
  cwd: "/fake/path",
  env: {},
  branch: "branch-name",
  ci: {
    isCi: true,
    isPullRequest: false
  },
  packages: [{ name: "", pathname: "." }],
  releaseInfos: [],
  config: mockedConfig
};
export const mockedContextWithEligibleBranch = { ...mockedContext, branch: "main" };
export const mockedContextInMonorepo = { ...mockedContext, config: mockedConfigInMonorepo };
export const mockedContextWithUndefinedBranchName = { ...mockedContext, branch: undefined };
