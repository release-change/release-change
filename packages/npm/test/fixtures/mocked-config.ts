import type { Config, Context } from "@release-change/shared";

import { DEFAULT_CONFIG } from "@release-change/config";

export const mockedConfig = DEFAULT_CONFIG as unknown as Config;
export const mockedConfigWithNoNpmPublish: Context["config"] = {
  ...mockedConfig,
  npmPublish: false
};
