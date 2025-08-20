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
  branch: "main"
};
export const mockedContextWithIneligibleBranch = { ...mockedContext, branch: "unmatched-branch" };
