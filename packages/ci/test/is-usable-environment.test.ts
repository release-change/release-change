import type { Config } from "@release-change/shared";

import { DEFAULT_CONFIG } from "@release-change/config";
import { setLogger } from "@release-change/logger";
import { afterEach, expect, it, vi } from "vitest";

import { isUsableEnvironment } from "../src/index.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

const expectedDefaultConfig = DEFAULT_CONFIG as unknown as Config;
const mockedContext = {
  cwd: "/fake/path",
  env: {},
  branch: "main",
  packages: [{ name: "", pathname: "." }],
  releaseInfos: [],
  errors: [],
  config: expectedDefaultConfig
};
const mockedContextWithNoAppNoCi = {
  ...mockedContext,
  ci: {
    isCi: false,
    isPullRequest: false
  },
  isAppTool: false
};
const mockedContextWithAppNoCi = {
  ...mockedContext,
  ci: {
    isCi: false,
    isPullRequest: false
  },
  isAppTool: true
};
const mockedContextWithCiOnPullRequestEvent = {
  ...mockedContext,
  ci: {
    isCi: true,
    isPullRequest: true
  },
  isAppTool: false
};
const mockedContextWithCiOnPushEvent = {
  ...mockedContext,
  ci: {
    isCi: true,
    isPullRequest: false
  },
  isAppTool: false
};
const mockedContextWithAppAndCiOnPushEvent = {
  ...mockedContext,
  ci: {
    isCi: true,
    isPullRequest: false
  },
  isAppTool: true
};

vi.mock("@release-change/logger", () => ({
  checkErrorType: vi.fn(),
  setLogger: vi.fn()
}));
vi.mocked(setLogger).mockReturnValue(mockedLogger);

afterEach(() => {
  vi.clearAllMocks();
});

it("should run in dry-run mode if no app environment nor CI environment are enabled", () => {
  expect(isUsableEnvironment(mockedContextWithNoAppNoCi)).toBe(true);
  expect(mockedContextWithNoAppNoCi.config.dryRun).toBe(true);
  expect(mockedLogger.logWarn).toHaveBeenCalledWith(
    "This run is not triggered in a known app or CI environment; therefore, the dry-run mode is enabled."
  );
});
it("should log a warning message if the CI environment is run within a pull request context", () => {
  expect(isUsableEnvironment(mockedContextWithCiOnPullRequestEvent)).toBe(false);
  expect(mockedLogger.logWarn).toHaveBeenCalledWith(
    "This run is triggered by a pull request; therefore, a new version will not be published."
  );
});
it("should not log any warning messages if the app environment is enabled", () => {
  expect(isUsableEnvironment(mockedContextWithAppNoCi)).toBe(true);
  expect(mockedLogger.logWarn).not.toHaveBeenCalled();
});
it("should not log any warning messages if the CI environment is run outside a pull request context", () => {
  expect(isUsableEnvironment(mockedContextWithCiOnPushEvent)).toBe(true);
  expect(mockedLogger.logWarn).not.toHaveBeenCalled();
});
it("should not log any warning messages if the app environment is enabled and the CI environment is run outside a pull request context", () => {
  expect(isUsableEnvironment(mockedContextWithAppAndCiOnPushEvent)).toBe(true);
  expect(mockedLogger.logWarn).not.toHaveBeenCalled();
});
