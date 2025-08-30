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
  packages: [{ name: "", path: "." }]
};
export const mockedContextInMonorepo: Context = {
  ...mockedContext,
  config: { ...expectedDefaultConfig, isMonorepo: true },
  packages: [
    { name: "", path: "." },
    { name: "@monorepo/a", path: "packages/a" },
    { name: "@monorepo/b", path: "packages/b" },
    { name: "@monorepo/c", path: "packages/c" }
  ]
};
