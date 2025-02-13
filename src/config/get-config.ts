import type { CliOptions } from "../cli/cli.types.js";
import type { Config } from "./config.types.js";

import getConfigFile from "./get-config-file.js";

import { DEFAULT_CONFIG } from "./constants.js";

/**
 * Gets the config. CLI options have precedence over config file options, which have precedence over default config options.
 * @param [cliOptions] - The options from the CLI.
 * @return The config to use based on CLI options, config file and/or default config.
 */
const getConfig = (cliOptions: CliOptions = {}): Config => {
  const configFile = getConfigFile();
  return configFile
    ? Object.assign({}, DEFAULT_CONFIG, getConfigFile(), cliOptions)
    : Object.assign({}, DEFAULT_CONFIG, cliOptions);
};

export default getConfig;
