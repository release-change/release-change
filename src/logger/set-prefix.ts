import type { LoggerContext } from "./logger.types.js";

import { addLeadingZero } from "./add-leading-zero.js";

import packageManager from "../../package.json" with { type: "json" };

/**
 * Sets prefix for messages logged to the console according to the context provided by `loggerContext`:
 * - if the debug mode is activated, the prefix uses the following format: `\x1b[1;34m[debug] <package name>:<feature name>\x1b[0m`;
 * - otherwise, the prefix uses the following format: `[HH:MM:SS] [<package name>] \u203a`.
 * @param timestamp - The timestamp when the message is logged.
 * @param loggerContext - The logger context (whether the debug mode is activated or not, what feature is concerned).
 * @return The prefix in the appropriate format.
 */
export const setPrefix = (timestamp: number, loggerContext: LoggerContext) => {
  const { isDebug, feature } = loggerContext;
  if (isDebug && feature) return `\x1b[1;34m[debug] ${packageManager.name}:${feature}\x1b[0m`;
  const hours = addLeadingZero(new Date(timestamp).getUTCHours());
  const minutes = addLeadingZero(new Date(timestamp).getUTCMinutes());
  const seconds = addLeadingZero(new Date(timestamp).getUTCSeconds());
  return `[${hours}:${minutes}:${seconds}] [${packageManager.name}] \u203a`;
};
