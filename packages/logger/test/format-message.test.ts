import type { LoggerContext } from "../src/logger.types.js";

import { WORKSPACE_NAME } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { formatMessage } from "../src/format-message.js";
import { setPrefix } from "../src/set-prefix.js";

const expectedTime = "13:37:42";
const mockedLoggerContextForDebugMode: LoggerContext = { isDebug: true, scope: "my-scope" };
const expectedFeature = mockedLoggerContextForDebugMode.scope;
const expectedPrefix = `[${expectedTime}] [${WORKSPACE_NAME}] \u203a`;
const messageTypes = [
  { type: "info", message: "Informational message", symbol: "\u2139" },
  { type: "error", message: "Error message", symbol: "\u2718" },
  { type: "warn", message: "Warning message", symbol: "\u26a0" },
  { type: "success", message: "Successful message", symbol: "\u2714" }
];

beforeEach(() => {
  vi.mock("../src/set-prefix.js", () => ({
    setPrefix: vi.fn()
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should format debug message", () => {
  const mockedMessage = "Debug message";
  const expectedPrefix = `\x1b[1;34m[debug] ${WORKSPACE_NAME}:${expectedFeature}\x1b[0m`;
  vi.mocked(setPrefix).mockReturnValue(expectedPrefix);
  expect(formatMessage(mockedMessage, mockedLoggerContextForDebugMode)).toBe(
    `${expectedPrefix} ${mockedMessage}`
  );
});

it.each(
  messageTypes
)("should format $message of type $type with $symbol when debug mode is deactivated", ({
  type,
  message,
  symbol
}) => {
  const mockedLoggerContext = { isDebug: false, type: type } as LoggerContext;
  vi.mocked(setPrefix).mockReturnValue(expectedPrefix);
  expect(formatMessage(message, mockedLoggerContext)).toBe(
    `${expectedPrefix} ${symbol} ${message}`
  );
});
