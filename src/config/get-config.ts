import type { CliOptions } from "../cli/cli.types.js";
import type { Config } from "./config.types.js";

import getConfigFile from "./get-config-file.js";

import { DEFAULT_CONFIG } from "./constants.js";

const getConfig = (cliOptions: CliOptions = {}): Config => {
  const configFile = getConfigFile();
  return configFile
    ? Object.assign({}, DEFAULT_CONFIG, getConfigFile(), cliOptions)
    : Object.assign({}, DEFAULT_CONFIG, cliOptions);
};

export default getConfig;
