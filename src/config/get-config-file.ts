import type { Config } from "./config.types.js";

import fs from "node:fs";

/**
 * Gets the options defined within the config file.
 * @return The config file contents parsed in JSON if the config file is found, `null` otherwise.
 */
const getConfigFile = (): Partial<Config> | null => {
  const pathToConfigFile = "../../.releasechangerc";
  return fs.existsSync(pathToConfigFile)
    ? JSON.parse(fs.readFileSync(pathToConfigFile, "utf8"))
    : null;
};

export default getConfigFile;
