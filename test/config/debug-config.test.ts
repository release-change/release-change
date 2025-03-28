import type { Config } from "../../src/config/config.types.js";
import type { Logger } from "../../src/logger/logger.types.js";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { debugConfig } from "../../src/config/debug-config.js";
import * as setLoggerModule from "../../src/logger/set-logger.js";

import { DEFAULT_CONFIG } from "../../src/config/constants.js";

describe("debug config", () => {
  const expectedDefaultConfig = DEFAULT_CONFIG as unknown as Config;
  const mockedContext = {
    cwd: "/fake/path",
    env: {},
    branch: "branch-name",
    ci: {
      isCi: true,
      isPullRequest: false
    },
    config: expectedDefaultConfig
  };
  const mockedLogger: Logger = {
    setDebugScope: vi.fn(),
    logDebug: vi.fn(),
    logInfo: vi.fn(),
    logError: vi.fn(),
    logWarn: vi.fn(),
    logSuccess: vi.fn()
  };

  beforeEach(() => {
    vi.spyOn(setLoggerModule, "setLogger").mockReturnValue(mockedLogger);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should not log debug logs when not in debug mode", () => {
    debugConfig(mockedContext);
    expect(mockedLogger.logDebug).not.toHaveBeenCalled();
  });
  it("should log debug logs when in debug mode", () => {
    mockedContext.config.debug = true;
    debugConfig(mockedContext);
    expect(mockedLogger.logDebug).toHaveBeenCalled();
  });
});
