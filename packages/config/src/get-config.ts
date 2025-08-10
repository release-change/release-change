import type { CliOptions, Config } from "@release-change/shared";

import { getRemoteName } from "@release-change/git";

import { getConfigFile } from "./get-config-file.js";
import { getRemoteRepositoryUrl } from "./get-remote-repository-url.js";
import { getRepositoryUrl } from "./get-repository-url.js";

import { DEFAULT_CONFIG } from "./constants.js";

/**
 * Gets the config. CLI options have precedence over config file options, which have precedence over default config options.
 * @param [cliOptions] - The options from the CLI.
 * @return The config to use based on CLI options, config file and/or default config.
 */
export const getConfig = async (cliOptions: CliOptions = {}): Promise<Config> => {
  const configFile = getConfigFile();
  const defaultConfig = {
    ...DEFAULT_CONFIG,
    repositoryUrl: getRepositoryUrl() ?? (await getRemoteRepositoryUrl()),
    remoteName: await getRemoteName()
  };
  return configFile
    ? Object.assign({}, defaultConfig, configFile, cliOptions)
    : Object.assign({}, defaultConfig, cliOptions);
};
