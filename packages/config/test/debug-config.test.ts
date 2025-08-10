import type { Logger } from "@release-change/logger";
import type { Config } from "@release-change/shared";

import { setLogger } from "@release-change/logger";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { DEFAULT_CONFIG, debugConfig } from "../src/index.js";

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
    vi.mock("@release-change/logger", () => ({
      checkErrorType: vi.fn(),
      setLogger: vi.fn()
    }));
    vi.mocked(setLogger).mockReturnValue(mockedLogger);
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
