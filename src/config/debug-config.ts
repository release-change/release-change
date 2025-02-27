import type { Context } from "../cli/cli.types.js";

import util from "node:util";

import { getConfigFile } from "./get-config-file.js";

import { CONFIG_FILE_NAME } from "./constants.js";

/**
 * Logs environment variables and config in debug mode.
 * @param context - The context where the CLI is running.
 */
export const debugConfig = (context: Context): void => {
  const { env, config, cwd, logger } = context;
  if (config && logger && config.debug) {
    logger.logDebug("Load environment variables", "env");
    logger.logDebug(util.inspect(env, { depth: Number.POSITIVE_INFINITY }), "env");
    logger.logDebug("Load config", "config");
    const isConfigFile = Boolean(getConfigFile());
    const configFileResult = isConfigFile
      ? `Config loaded from \`${cwd}/${CONFIG_FILE_NAME}\``
      : "Config file not found";
    logger.logDebug(configFileResult, "config");
    logger.logDebug(util.inspect(config, { depth: Number.POSITIVE_INFINITY }), "config");
  }
};
