type DebugScopeFunction = (scope: string) => string;
type LoggerFunction = (message: string) => void;
export type LoggerContext = {
  isDebug: boolean;
  scope?: string;
  type?: MessageType;
};
type MessageType = "info" | "error" | "warn" | "success";
export type MessageTypeSymbols = Record<MessageType, string>;
export type Logger = {
  setDebugScope: DebugScopeFunction;
  logDebug: LoggerFunction;
  logInfo: LoggerFunction;
  logError: LoggerFunction;
  logWarn: LoggerFunction;
  logSuccess: LoggerFunction;
};
