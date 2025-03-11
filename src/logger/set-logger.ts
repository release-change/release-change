import type { Logger } from "./logger.types.js";

import { formatMessage } from "./format-message.js";

/**
 * Sets the logger object.
 * @param isDebug - Whether the debug mode is activated or not.
 * @return The logger object.
 */
export const setLogger = (isDebug: boolean): Logger => {
  const loggerContext = {
    isDebug: Boolean(isDebug)
  };
  return {
    logDebug: (message: string, feature: string): void => {
      console.debug(formatMessage(message, { ...loggerContext, feature }));
    },
    logInfo: (message: string): void => {
      console.info(formatMessage(message, { ...loggerContext, type: "info" }));
    },
    logError: (message: string): void => {
      console.error(
        "\x1b[1;31m%s\x1b[0m",
        formatMessage(message, { ...loggerContext, type: "error" })
      );
    },
    logWarn: (message: string): void => {
      console.warn("\x1b[33m%s\x1b[0m", formatMessage(message, { ...loggerContext, type: "warn" }));
    },
    logSuccess: (message: string): void => {
      console.log(
        "\x1b[32m%s\x1b[0m",
        formatMessage(message, { ...loggerContext, type: "success" })
      );
    }
  };
};
