import type { Context } from "@release-change/shared";

import { setLogger } from "@release-change/logger";
import { deepInspectObject } from "@release-change/shared";

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
    logger.setDebugScope("config:debug-config");
    logger.logDebug("Load environment variables");
    logger.logDebug(deepInspectObject(env));
    logger.logDebug("Load config");
    const isConfigFile = Boolean(getConfigFile());
    const configFileResult = isConfigFile
      ? `Config loaded from \`${cwd}/${CONFIG_FILE_NAME}\``
      : "Config file not found";
    logger.logDebug(configFileResult);
    logger.logDebug(deepInspectObject(config));
  }
};
