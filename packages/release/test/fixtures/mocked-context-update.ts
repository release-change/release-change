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
    { name: "", path: "." },
    { name: "@monorepo/a", path: "packages/a" },
    { name: "@monorepo/b", path: "packages/b" }
  ],
  config: DEFAULT_CONFIG as unknown as Config
};
