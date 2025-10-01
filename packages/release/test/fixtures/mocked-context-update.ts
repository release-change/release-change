import type { Config, Context } from "@release-change/shared";

import { DEFAULT_CONFIG } from "@release-change/config";

export const mockedContext: Context = {
  cwd: "/fake/path",
  env: {},
  branch: "main",
  ci: {
    isCi: true,
    isPullRequest: false
  },
  packages: [
    { name: "", pathname: "." },
    { name: "@monorepo/a", pathname: "packages/a" },
    { name: "@monorepo/b", pathname: "packages/b" }
  ],
  releaseInfos: [],
  config: DEFAULT_CONFIG as unknown as Config
};
