import type { LoggerContext } from "../../src/logger/logger.types.js";

import { describe, expect, it } from "vitest";

import { setPrefix } from "../../src/logger/set-prefix.js";

import { WORKSPACE_NAME } from "../../src/shared/constants.js";

describe("set prefix", () => {
  const mockedTimestamp = 1735738662000;
  const expectedTime = "13:37:42";
  const mockedLoggerContextForDebugMode: LoggerContext = { isDebug: true, scope: "my-scope" };
  const mockedLoggerContextForDebugModeWithoutScope: LoggerContext = { isDebug: true, scope: "" };
  const mockedLoggerContextNotForDebugMode: LoggerContext = { isDebug: false, type: "info" };
  const expectedFeature = mockedLoggerContextForDebugMode.scope;

  it("should return the appropriate prefix when debug mode is activated", () => {
    expect(setPrefix(mockedTimestamp, mockedLoggerContextForDebugMode)).toBe(
      `\x1b[1;34m[debug] ${WORKSPACE_NAME}:${expectedFeature}\x1b[0m`
    );
  });
  it("should return the appropriate prefix when debug mode is activated and there is no scope", () => {
    expect(setPrefix(mockedTimestamp, mockedLoggerContextForDebugModeWithoutScope)).toBe(
      `\x1b[1;34m[debug] ${WORKSPACE_NAME}\x1b[0m`
    );
  });
  it("should return the appropriate prefix when debug mode is deactivated", () => {
    expect(setPrefix(mockedTimestamp, mockedLoggerContextNotForDebugMode)).toBe(
      `[${expectedTime}] [${WORKSPACE_NAME}] \u203a`
    );
  });
});
