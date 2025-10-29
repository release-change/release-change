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
  errors: [],
  branch: "main"
};
