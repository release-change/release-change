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
  branch: undefined
};
export const mockedContextInMonorepo = {
  ...mockedContext,
  config: { ...mockedConfig, isMonorepo: true }
};
