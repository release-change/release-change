import type { Logger } from "./logger.types.js";

import { formatMessage } from "./format-message.js";

/**
 * Sets the logger object.
 * @param [isDebug] - Whether the debug mode is activated or not.
 * @return The logger object.
 */
export const setLogger = (isDebug = false): Logger => {
  const loggerContext = {
    isDebug
  };
  let normalScope = "";
  let debugScope = "";
  return {
    setScope: (scope: string): string => {
      normalScope = scope;
      return scope;
    },
    setDebugScope: (scope: string): string => {
      debugScope = scope;
      return scope;
    },
    logDebug: (message: string): void => {
      console.debug(formatMessage(message, { ...loggerContext, debugScope: debugScope }));
    },
    logInfo: (message: string): void => {
      console.info(formatMessage(message, { ...loggerContext, scope: normalScope, type: "info" }));
    },
    logError: (message: string): void => {
      console.error(
        "\x1b[1;31m%s\x1b[0m",
        formatMessage(message, { ...loggerContext, scope: normalScope, type: "error" })
      );
    },
    logWarn: (message: string): void => {
      console.warn(
        "\x1b[33m%s\x1b[0m",
        formatMessage(message, { ...loggerContext, scope: normalScope, type: "warn" })
      );
    },
    logSuccess: (message: string): void => {
      console.log(
        "\x1b[32m%s\x1b[0m",
        formatMessage(message, { ...loggerContext, scope: normalScope, type: "success" })
      );
    },
    logWithoutFormatting: (message: string): void => {
      console.log(message);
    }
  };
};
