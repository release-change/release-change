import type { LoggerContext } from "./logger.types.js";

import { WORKSPACE_NAME } from "@release-change/shared";

/**
 * Sets prefix for messages logged to the console according to the context provided by `loggerContext`:
 * - if the debug mode is activated, the prefix uses one of the following formats:
 *   -`\x1b[1;34m[debug] <package name>\x1b[0m`,
 *   -`\x1b[1;34m[debug] <package name>:<scope name>\x1b[0m`;
 * - otherwise, the prefix uses one of the following formats:
 *   -`[HH:MM:SS] [<package name>] \u203a`,
 *   -`[HH:MM:SS] [<package name>] [@<package name>/<scope name>] \u203a`.
 * @param timestamp - The timestamp when the message is logged.
 * @param loggerContext - The logger context (whether the debug mode is activated or not, what scope is concerned).
 * @return The prefix in the appropriate format.
 */
export const setPrefix = (timestamp: number, loggerContext: LoggerContext): string => {
  const { isDebug, scope } = loggerContext;
  if (isDebug) {
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
  if (scope) return `[${time}] [${WORKSPACE_NAME}] [@${WORKSPACE_NAME}/${scope}] \u203a`;
  return `[${time}] [${WORKSPACE_NAME}] \u203a`;
};
