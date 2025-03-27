import type { LoggerContext } from "./logger.types.js";

import { addLeadingZero } from "./add-leading-zero.js";

import { PACKAGE_NAME } from "../shared/constants.js";

/**
 * Sets prefix for messages logged to the console according to the context provided by `loggerContext`:
 * - if the debug mode is activated, the prefix uses the following format: `\x1b[1;34m[debug] <package name>:<scope name>\x1b[0m`;
 * - otherwise, the prefix uses the following format: `[HH:MM:SS] [<package name>] \u203a`.
 * @param timestamp - The timestamp when the message is logged.
 * @param loggerContext - The logger context (whether the debug mode is activated or not, what scope is concerned).
 * @return The prefix in the appropriate format.
 */
export const setPrefix = (timestamp: number, loggerContext: LoggerContext): string => {
  const { isDebug, scope } = loggerContext;
  if (isDebug && typeof scope === "string") {
    if (scope) return `\x1b[1;34m[debug] ${PACKAGE_NAME}:${scope}\x1b[0m`;
    return `\x1b[1;34m[debug] ${PACKAGE_NAME}\x1b[0m`;
  }
  const hours = addLeadingZero(new Date(timestamp).getUTCHours());
  const minutes = addLeadingZero(new Date(timestamp).getUTCMinutes());
  const seconds = addLeadingZero(new Date(timestamp).getUTCSeconds());
  return `[${hours}:${minutes}:${seconds}] [${PACKAGE_NAME}] \u203a`;
};
