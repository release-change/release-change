import type { LoggerContext } from "./logger.types.js";

import { WORKSPACE_NAME } from "@release-change/shared";

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
    if (scope) return `\x1b[1;34m[debug] ${WORKSPACE_NAME}:${scope}\x1b[0m`;
    return `\x1b[1;34m[debug] ${WORKSPACE_NAME}\x1b[0m`;
  }
  const time = Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC"
  }).format(timestamp);
  return `[${time}] [${WORKSPACE_NAME}] \u203a`;
};
