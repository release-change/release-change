import type { Context } from "@release-change/shared/";

import { mockedConfig } from "./mocked-config.js";

export const mockedContext = {
  cwd: "/fake/path",
  env: {},
  branch: "branch-name",
  ci: {
    isCi: true,
    isPullRequest: false
  },
  config: mockedConfig
} as Context;
export const mockedContextWithEligibleBranch = { ...mockedContext, branch: "main" };
