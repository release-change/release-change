type LoggerFunction = (message: string) => void;
type LoggerFunctionWithContext = (message: string, featureContext: string) => void;
export type LoggerContext = {
  isDebug: boolean;
  feature?: string;
  type?: MessageType;
};
type MessageType = "info" | "error" | "warn" | "success";
export type MessageTypeSymbols = Record<MessageType, string>;
export type Logger = {
  logDebug: LoggerFunctionWithContext;
  logInfo: LoggerFunction;
  logError: LoggerFunction;
  logWarn: LoggerFunction;
  logSuccess: LoggerFunction;
};
