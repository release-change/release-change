import { afterEach, assert, beforeEach, it, vi } from "vitest";

import { configureCiEnvironment } from "../src/index.js";
import { isCiToolDetected } from "../src/is-ci-tool-detected.js";

const mockedEnvWithUnknownCiEnvironment = {};
const mockedEnvWithGitHubActionsOnPushEvent = {
  CI: "true",
  GITHUB_ACTIONS: "true",
  GITHUB_EVENT_NAME: "push"
};
const mockedEnvWithGitHubActionsOnPullRequestEvent = {
  CI: "true",
  GITHUB_ACTIONS: "true",
  GITHUB_EVENT_NAME: "pull_request"
};
const mockedEnvWithGitHubActionsOnPullRequestTargetEvent = {
  CI: "true",
  GITHUB_ACTIONS: "true",
  GITHUB_EVENT_NAME: "pull_request_target"
};

beforeEach(() => {
  vi.mock("../src/is-ci-tool-detected.js", () => ({
    isCiToolDetected: vi.fn()
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should return an object with `isCi` set to `false` and `isPullRequest` set to `false` when CI environment is unknown", () => {
  const expectedConfig = {
    isCi: false,
    isPullRequest: false
  };
  vi.mocked(isCiToolDetected).mockReturnValue(false);
  assert.deepEqual(configureCiEnvironment(mockedEnvWithUnknownCiEnvironment), expectedConfig);
});
it("should return an object with `isCi` set to `true` and `isPullRequest` set to `false` when CI environment is GitHub Actions on push event", () => {
  const expectedConfig = {
    isCi: true,
    isPullRequest: false
  };
  vi.mocked(isCiToolDetected).mockReturnValue(true);
  assert.deepEqual(configureCiEnvironment(mockedEnvWithGitHubActionsOnPushEvent), expectedConfig);
});
it("should return an object with `isCi` set to `true` and `isPullRequest` set to `true` when CI environment is GitHub Actions on pull_request event", () => {
  const expectedConfig = {
    isCi: true,
    isPullRequest: true
  };
  vi.mocked(isCiToolDetected).mockReturnValue(true);
  assert.deepEqual(
    configureCiEnvironment(mockedEnvWithGitHubActionsOnPullRequestEvent),
    expectedConfig
  );
});
it("should return an object with `isCi` set to `true` and `isPullRequest` set to `true` when CI environment is GitHub Actions on pull_request_target event", () => {
  const expectedConfig = {
    isCi: true,
    isPullRequest: true
  };
  vi.mocked(isCiToolDetected).mockReturnValue(true);
  assert.deepEqual(
    configureCiEnvironment(mockedEnvWithGitHubActionsOnPullRequestTargetEvent),
    expectedConfig
  );
});
