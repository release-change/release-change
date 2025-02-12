type LoggerFunction = (s: string) => void;
export type MessageType = "info" | "error" | "warn" | "success";
export type MessageTypeSymbols = Record<MessageType, string>;
export type Logger = {
  logInfo: LoggerFunction;
  logError: LoggerFunction;
  logWarn: LoggerFunction;
  logSuccess: LoggerFunction;
};
