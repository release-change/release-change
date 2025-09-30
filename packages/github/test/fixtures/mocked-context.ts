import type { Context } from "@release-change/shared";

import { mockedConfig } from "./mocked-config.js";
import { mockedToken } from "./mocked-token.js";

const mockedContext: Context = {
  cwd: "/fake/path",
  env: {
    RELEASE_TOKEN: mockedToken
  },
  branch: "main",
  ci: {
    isCi: true,
    isPullRequest: false
  },
  packages: [{ name: "", pathname: "." }],
  config: mockedConfig
};
export const mockedContextWithNextRelease: Context = {
  ...mockedContext,
  nextRelease: [{ name: "", pathname: ".", gitTag: "v1.2.3", version: "1.2.3" }]
};
