import type { Config } from "@release-change/shared";

import { DEFAULT_CONFIG } from "@release-change/config";
import { setLogger } from "@release-change/logger";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { isUsableCiEnvironment } from "../src/index.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

const expectedDefaultConfig = DEFAULT_CONFIG as unknown as Config;
const mockedContext = {
  cwd: "/fake/path",
  env: {},
  branch: "main",
  packages: [{ name: "", pathname: "." }],
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
  vi.mock("@release-change/logger", () => ({
    checkErrorType: vi.fn(),
    setLogger: vi.fn()
  }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
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
