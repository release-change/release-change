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
  config: expectedDefaultConfig
};
