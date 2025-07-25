import type { LoggerContext, MessageTypeSymbols } from "./logger.types.js";

import { setPrefix } from "./set-prefix.js";

/**
 * Formats the message according to the context provided by `loggerContext`:
 * - if the debug mode is activated, the message is formatted with the prefix;
 * - otherwise, the message is formatted with the prefix and the appropriate symbol according to its type:
 *   - `\u2139` if the message is of type `info`,
 *   - `\u2718` if the message is of type `error`,
 *   - `\u26a0` if the message is of type `warn`,
 *   - `\u2714` if the message is of type `success`.
 * @param message - The message to format.
 * @param loggerContext - The logger context: whether the debug mode is activated or not, what scope is concerned (optional) and the message type (optional).
 * @return The formatted message.
 */
export const formatMessage = (message: string, loggerContext: LoggerContext): string => {
  const prefix = setPrefix(Date.now(), loggerContext);
  const symbols: MessageTypeSymbols = {
    info: "\u2139",
    error: "\u2718",
    warn: "\u26a0",
    success: "\u2714"
  };
  const { type } = loggerContext;
  return type ? `${prefix} ${symbols[type]} ${message}` : `${prefix} ${message}`;
};
