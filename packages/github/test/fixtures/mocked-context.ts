import type { Context } from "@release-change/shared";

import { mockedConfig } from "./mocked-config.js";
import { mockedIssuePRToken, mockedToken } from "./mocked-token.js";

export const mockedContext: Context = {
  cwd: "/fake/path",
  env: {
    RELEASE_TOKEN: mockedToken,
    ISSUE_PR_TOKEN: mockedIssuePRToken
  },
  branch: "main",
  ci: {
    isCi: true,
    isPullRequest: false
  },
  packages: [{ name: "", pathname: "." }],
  releaseInfos: [],
  config: mockedConfig
};
export const mockedContextWithNextRelease: Context = {
  ...mockedContext,
  nextRelease: [{ name: "", pathname: ".", gitTag: "v1.2.3", version: "1.2.3" }]
};
export const mockedContextWithNextReleaseInMonorepo: Context = {
  ...mockedContext,
  config: { ...mockedConfig, isMonorepo: true },
  nextRelease: [
    { name: "", pathname: ".", gitTag: "v1.2.3", version: "1.2.3" },
    { name: "@monorepo/a", pathname: "packages/a", gitTag: "@monorepo/a@v1.2.3", version: "1.2.3" }
  ]
};
