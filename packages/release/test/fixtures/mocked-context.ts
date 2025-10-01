import type { Context } from "@release-change/shared";

import { mockedConfig } from "./mocked-config.js";

export const mockedContext: Context = {
  cwd: "/fake/path",
  env: {},
  config: mockedConfig,
  ci: {
    isCi: true,
    isPullRequest: false
  },
  packages: [{ name: "", pathname: "." }],
  releaseInfos: [],
  branch: "main"
};
export const mockedContextWithIneligibleBranch = { ...mockedContext, branch: "unmatched-branch" };
export const mockedContextInMonorepo = {
  ...mockedContext,
  config: { ...mockedConfig, isMonorepo: true }
};
