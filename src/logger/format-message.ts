import type { MessageType, MessageTypeSymbols } from "./logger.types.js";

import setPrefix from "./set-prefix.js";

/**
 * Formats the message with the prefix and the appropriate symbol according to its type:
 * - `\u2139` if the message is of type `info`,
 * - `\u2718` if the message is of type `error`,
 * - `\u26a0` if the message is of type `warn`,
 * - `\u2714` if the message is of type `success`.
 * @param message - The message to format.
 * @param [type] - The message type, from one of these: `info`, `error`, `warn` or `success`.
 * @return The formatted message.
 */
const formatMessage = (message: string, type?: MessageType): string => {
  const prefix = setPrefix(Date.now());
  const symbols: MessageTypeSymbols = {
    info: "\u2139",
    error: "\u2718",
    warn: "\u26a0",
    success: "\u2714"
  };
  return type ? `${prefix} ${symbols[type]} ${message}` : `${prefix} ${message}`;
};

export default formatMessage;
