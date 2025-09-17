import type { Context } from "@release-change/shared";

import { mockedConfig } from "./mocked-config.js";

export const mockedContext: Context = {
  cwd: "/fake/path",
  env: {},
  branch: "main",
  ci: {
    isCi: true,
    isPullRequest: false
  },
  config: mockedConfig,
  packages: [{ name: "", path: "." }],
  releaseInfos: []
};
