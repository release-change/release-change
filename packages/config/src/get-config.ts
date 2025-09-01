import type { CliOptions, Config } from "@release-change/shared";

import { getConfigFile } from "./get-config-file.js";
import { getRepositoryUrl } from "./get-repository-url.js";

import { DEFAULT_CONFIG } from "./constants.js";

/**
 * Gets the config. CLI options have precedence over config file options, which have precedence over default config options.
 * @param [cliOptions] - The options from the CLI.
 * @param [isMonorepo] - Whether the current directory is a monorepo or not.
 * @return The config to use based on CLI options, config file and/or default config.
 */
export const getConfig = async (
  cliOptions: CliOptions = {},
  isMonorepo = false
): Promise<Config> => {
  const configFile = getConfigFile();
  const dependencyUpdateMethod = isMonorepo ? (configFile?.dependencyUpdateMethod ?? "pin") : null;
  const defaultConfig = {
    ...DEFAULT_CONFIG,
    repositoryUrl: String(getRepositoryUrl())
  };
  return configFile
    ? Object.assign(
        {},
        defaultConfig,
        { ...configFile, isMonorepo, dependencyUpdateMethod },
        cliOptions
      )
    : Object.assign({}, defaultConfig, { isMonorepo, dependencyUpdateMethod }, cliOptions);
};
