import type { LoggerContext } from "../../src/logger/logger.types.js";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { formatMessage } from "../../src/logger/format-message.js";
import { setPrefix } from "../../src/logger/set-prefix.js";

import { PACKAGE_NAME } from "../../src/shared/constants.js";

describe("format message", () => {
  const expectedTime = "13:37:42";
  const mockedLoggerContextForDebugMode: LoggerContext = { isDebug: true, feature: "my-feature" };
  const expectedFeature = mockedLoggerContextForDebugMode.feature;

  beforeEach(() => {
    vi.mock("../../src/logger/set-prefix.js", () => ({
      setPrefix: vi.fn()
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should format debug message", () => {
    const mockedMessage = "Debug message";
    const expectedPrefix = `\x1b[1;34m[debug] ${PACKAGE_NAME}:${expectedFeature}\x1b[0m`;
    vi.mocked(setPrefix).mockReturnValue(expectedPrefix);
    expect(formatMessage(mockedMessage, mockedLoggerContextForDebugMode)).toBe(
      `${expectedPrefix} ${mockedMessage}`
    );
  });

  describe("format message when debug mode is deactivated", () => {
    const expectedPrefix = `[${expectedTime}] [${PACKAGE_NAME}] \u203a`;
    const messageTypes = [
      { type: "info", message: "Informational message", symbol: "\u2139" },
      { type: "error", message: "Error message", symbol: "\u2718" },
      { type: "warn", message: "Warning message", symbol: "\u26a0" },
      { type: "success", message: "Successful message", symbol: "\u2714" }
    ];

    it.each(messageTypes)(
      "should format $message of type $type with $symbol",
      ({ type, message, symbol }) => {
        const mockedLoggerContext = { isDebug: false, type: type } as LoggerContext;
        vi.mocked(setPrefix).mockReturnValue(expectedPrefix);
        expect(formatMessage(message, mockedLoggerContext)).toBe(
          `${expectedPrefix} ${symbol} ${message}`
        );
      }
    );
  });
});
