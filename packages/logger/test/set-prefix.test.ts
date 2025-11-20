import type { LoggerContext } from "../src/logger.types.js";

import { WORKSPACE_NAME } from "@release-change/shared";
import { describe, expect, it } from "vitest";

import { setPrefix } from "../src/set-prefix.js";

const times = [
  { mockedTimestamp: 1735707843000, expectedTime: "05:04:03" },
  { mockedTimestamp: 1735738662000, expectedTime: "13:37:42" }
];
const mockedLoggerContextForDebugMode: LoggerContext = { isDebug: true, debugScope: "my-scope" };
const mockedLoggerContextForDebugModeWithoutScope: LoggerContext = {
  isDebug: true,
  debugScope: ""
};
const mockedLoggerContextForDebugModeWithoutDebugScope: LoggerContext = {
  isDebug: true,
  scope: "my-scope",
  type: "info"
};
const mockedLoggerContextNotForDebugMode: LoggerContext = {
  isDebug: false,
  scope: "my-scope",
  type: "info"
};
const mockedLoggerContextNotForDebugModeWithoutScope: LoggerContext = {
  isDebug: false,
  type: "info"
};

describe.each(times)("timestamp at $mockedTimestamp ($expectedTime UTC)", ({
  mockedTimestamp,
  expectedTime
}) => {
  it("should return the appropriate prefix when debug mode is activated", () => {
    expect(setPrefix(mockedTimestamp, mockedLoggerContextForDebugMode)).toBe(
      `\x1b[1;34m[debug] ${WORKSPACE_NAME}:my-scope\x1b[0m`
    );
  });
  it("should return the appropriate prefix when debug mode is activated and there is no scope", () => {
    expect(setPrefix(mockedTimestamp, mockedLoggerContextForDebugModeWithoutScope)).toBe(
      `\x1b[1;34m[debug] ${WORKSPACE_NAME}\x1b[0m`
    );
  });
  it("should return the appropriate prefix when debug mode is activated and there is no debug scope", () => {
    expect(setPrefix(mockedTimestamp, mockedLoggerContextForDebugModeWithoutDebugScope)).toBe(
      `[${expectedTime}] [${WORKSPACE_NAME}] [@${WORKSPACE_NAME}/my-scope] \u203a`
    );
  });
  it("should return the appropriate prefix when debug mode is deactivated", () => {
    expect(setPrefix(mockedTimestamp, mockedLoggerContextNotForDebugMode)).toBe(
      `[${expectedTime}] [${WORKSPACE_NAME}] [@${WORKSPACE_NAME}/my-scope] \u203a`
    );
  });
  it("should return the appropriate prefix when debug mode is deactivated and there is no scope", () => {
    expect(setPrefix(mockedTimestamp, mockedLoggerContextNotForDebugModeWithoutScope)).toBe(
      `[${expectedTime}] [${WORKSPACE_NAME}] \u203a`
    );
  });
});
