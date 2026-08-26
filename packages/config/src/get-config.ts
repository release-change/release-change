import type { CliOptions, Config } from "@release-change/shared";

import { getConfigFile } from "./get-config-file.js";
import { getRepositoryUrl } from "./get-repository-url.js";

import { DEFAULT_CONFIG } from "./constants.js";

/**
 * Gets the config. CLI options have precedence over config file options, which have precedence over default config options.
 *
 * Some parameters are finalised later once the packages have been resolved.
 * @param [cliOptions] - The options from the CLI.
 * @return The config base to use based on CLI options, config file and/or default config.
 */
export const getConfig = (cliOptions: CliOptions = {}): Config => {
  const configFile = getConfigFile();
  const defaultConfig = {
    ...DEFAULT_CONFIG,
    repositoryUrl: String(getRepositoryUrl())
  };
  return configFile
    ? Object.assign({}, defaultConfig, configFile, cliOptions)
    : Object.assign({}, defaultConfig, cliOptions);
};
