import type { Logger } from "./logger.types.js";

import formatMessage from "./format-message.js";

/**
 * Sets the logger object.
 * @return The logger object.
 */
const setLogger = (): Logger => {
  return {
    logInfo: (message: string): void => {
      console.info(formatMessage(message, "info"));
    },
    logError: (message: string): void => {
      console.error("\x1b[1;31m%s\x1b[0m", formatMessage(message, "error"));
    },
    logWarn: (message: string): void => {
      console.warn("\x1b[33m%s\x1b[0m", formatMessage(message, "warn"));
    },
    logSuccess: (message: string): void => {
      console.log("\x1b[32m%s\x1b[0m", formatMessage(message, "success"));
    }
  };
};

export default setLogger;
