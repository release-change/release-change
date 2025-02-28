import type { Config } from "../../src/config/config.types.js";

import { describe, expect, it, vi } from "vitest";

import { debugConfig } from "../../src/config/debug-config.js";

import { DEFAULT_CONFIG } from "../../src/config/constants.js";

describe("debug config", () => {
  const expectedDefaultConfig = DEFAULT_CONFIG as unknown as Config;
  const mockedContext = {
    cwd: "/fake/path",
    env: {},
    branch: null,
    config: expectedDefaultConfig,
    logger: {
      logDebug: vi.fn(),
      logInfo: vi.fn(),
      logError: vi.fn(),
      logWarn: vi.fn(),
      logSuccess: vi.fn()
    }
  };

  it("should not log debug logs when not in debug mode", () => {
    debugConfig(mockedContext);
    expect(mockedContext.logger.logDebug).not.toHaveBeenCalled();
  });
  it("should log debug logs when in debug mode", () => {
    mockedContext.config.debug = true;
    debugConfig(mockedContext);
    expect(mockedContext.logger.logDebug).toHaveBeenCalled();
  });
});
