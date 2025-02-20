import type { LoggerContext } from "../../src/logger/logger.types.js";

import { describe, expect, it } from "vitest";

import { setPrefix } from "../../src/logger/set-prefix.js";

import { PACKAGE_NAME } from "../../src/shared/constants.js";

describe("set prefix", () => {
  const mockedTimestamp = 1735738662000;
  const expectedTime = "13:37:42";
  const mockedLoggerContextForDebugMode: LoggerContext = { isDebug: true, feature: "my-feature" };
  const mockedLoggerContextNotForDebugMode: LoggerContext = { isDebug: false, type: "info" };
  const expectedFeature = mockedLoggerContextForDebugMode.feature;

  it("should return the appropriate prefix when debug mode is activated", () => {
    expect(setPrefix(mockedTimestamp, mockedLoggerContextForDebugMode)).toBe(
      `\x1b[1;34m[debug] ${PACKAGE_NAME}:${expectedFeature}\x1b[0m`
    );
  });
  it("should return the appropriate prefix when debug mode is deactivated", () => {
    expect(setPrefix(mockedTimestamp, mockedLoggerContextNotForDebugMode)).toBe(
      `[${expectedTime}] [${PACKAGE_NAME}] \u203a`
    );
  });
});
