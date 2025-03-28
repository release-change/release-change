import type { Config } from "../../src/config/config.types.js";
import type { Logger } from "../../src/logger/logger.types.js";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { isUsableCiEnvironment } from "../../src/ci/is-usable-ci-environment.js";
import * as setLoggerModule from "../../src/logger/set-logger.js";

import { DEFAULT_CONFIG } from "../../src/config/constants.js";

describe("check if the CI environment is usable", () => {
  const mockedLogger: Logger = {
    setDebugScope: vi.fn(),
    logDebug: vi.fn(),
    logInfo: vi.fn(),
    logError: vi.fn(),
    logWarn: vi.fn(),
    logSuccess: vi.fn()
  };
  const expectedDefaultConfig = DEFAULT_CONFIG as unknown as Config;
  const mockedContext = {
    cwd: "/fake/path",
    env: {},
    branch: "main",
    config: expectedDefaultConfig
  };
  const mockedContextWithNoCi = {
    ...mockedContext,
    ci: {
      isCi: false,
      isPullRequest: false
    }
  };
  const mockedContextWithCiOnPullRequestEvent = {
    ...mockedContext,
    ci: {
      isCi: true,
      isPullRequest: true
    }
  };
  const mockedContextWithCiOnPushEvent = {
    ...mockedContext,
    ci: {
      isCi: true,
      isPullRequest: false
    }
  };

  beforeEach(() => {
    vi.spyOn(setLoggerModule, "setLogger").mockReturnValue(mockedLogger);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should run in dry-run mode if no CI environment is enabled", () => {
    expect(isUsableCiEnvironment(mockedContextWithNoCi)).toBe(true);
    expect(mockedContextWithNoCi.config.dryRun).toBe(true);
    expect(mockedLogger.logWarn).toHaveBeenCalledWith(
      "This run is not triggered in a known CI environment; therefore, the dry-run mode is enabled."
    );
  });
  it("should log a warning message if the CI environment is run within a pull request context", () => {
    expect(isUsableCiEnvironment(mockedContextWithCiOnPullRequestEvent)).toBe(false);
    expect(mockedLogger.logWarn).toHaveBeenCalledWith(
      "This run is triggered by a pull request; therefore, a new version will not be published."
    );
  });
  it("should not log any warning messages if the CI environment is run outside a pull request context", () => {
    expect(isUsableCiEnvironment(mockedContextWithCiOnPushEvent)).toBe(true);
    expect(mockedLogger.logWarn).not.toHaveBeenCalled();
  });
});
