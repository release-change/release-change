import type { Config } from "./config.types.js";

import fs from "node:fs";

const getConfigFile = (): Partial<Config> | null => {
  const pathToConfigFile = "../../.releasechangerc";
  return fs.existsSync(pathToConfigFile)
    ? JSON.parse(fs.readFileSync(pathToConfigFile, "utf8"))
    : null;
};

export default getConfigFile;
