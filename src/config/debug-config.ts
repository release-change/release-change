import type { Context } from "../cli/cli.types.js";

import util from "node:util";

import { setLogger } from "../logger/index.js";
import { getConfigFile } from "./get-config-file.js";

import { CONFIG_FILE_NAME } from "./constants.js";

/**
 * Logs environment variables and config in debug mode.
 * @param context - The context where the CLI is running.
 */
export const debugConfig = (context: Context): void => {
  const { env, config, cwd } = context;
  const logger = setLogger(config.debug);
  if (config.debug) {
    logger.setDebugScope("env");
    logger.logDebug("Load environment variables");
    logger.logDebug(util.inspect(env, { depth: Number.POSITIVE_INFINITY }));
    logger.setDebugScope("config");
    logger.logDebug("Load config");
    const isConfigFile = Boolean(getConfigFile());
    const configFileResult = isConfigFile
      ? `Config loaded from \`${cwd}/${CONFIG_FILE_NAME}\``
      : "Config file not found";
    logger.logDebug(configFileResult);
    logger.logDebug(util.inspect(config, { depth: Number.POSITIVE_INFINITY }));
  }
};
