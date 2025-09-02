import type { Context } from "@release-change/shared";

import { mockedConfig } from "./mocked-config.js";
import { mockedToken } from "./mocked-token.js";

export const mockedContext: Context = {
  cwd: "/fake/path",
  env: {
    RELEASE_TOKEN: mockedToken
  },
  branch: "main",
  ci: {
    isCi: true,
    isPullRequest: false
  },
  packages: [{ name: "", path: "." }],
  config: mockedConfig
};
