import type { Context } from "@release-change/shared";

import { mockedConfig, mockedConfigWithNoNpmPublish } from "./mocked-config.js";

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
export const mockedContextWithNoNpmPublish: Context = {
  ...mockedContext,
  config: mockedConfigWithNoNpmPublish
};
export const mockedContextWithAuthToken: Context = {
  ...mockedContext,
  authToken: {
    fileExists: true,
    authTokenExists: true
  }
};
