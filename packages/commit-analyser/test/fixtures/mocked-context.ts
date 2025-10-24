import type { Config, Context } from "@release-change/shared";

import { DEFAULT_CONFIG } from "@release-change/config";

const expectedDefaultConfig = DEFAULT_CONFIG as unknown as Config;
export const mockedContext: Context = {
  cwd: "/fake/path",
  env: {},
  branch: "main",
  ci: {
    isCi: true,
    isPullRequest: false
  },
  config: expectedDefaultConfig,
  packages: [{ name: "", pathname: "." }],
  releaseInfos: [],
  errors: []
};
export const mockedContextInMonorepo: Context = {
  ...mockedContext,
  config: { ...expectedDefaultConfig, isMonorepo: true },
  packages: [
    { name: "", pathname: "." },
    { name: "@monorepo/a", pathname: "packages/a" },
    { name: "@monorepo/b", pathname: "packages/b" },
    { name: "@monorepo/c", pathname: "packages/c" }
  ]
};
