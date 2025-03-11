import type { Config } from "./config.types.js";

import fs from "node:fs";
import { cwd } from "node:process";

import { CONFIG_FILE_NAME } from "./constants.js";

/**
 * Gets the options defined within the config file.
 * @return The config file contents parsed in JSON if the config file is found, `null` otherwise.
 */
export const getConfigFile = (): Config | null => {
  const pathToConfigFile = `${cwd()}/${CONFIG_FILE_NAME}`;
  return fs.existsSync(pathToConfigFile)
    ? JSON.parse(fs.readFileSync(pathToConfigFile, "utf8"))
    : null;
};
