import { expect, it } from "vitest";

import { isAppToolDetected } from "../src/is-app-tool-detected.js";

const mockedEnvWithUnknownCiEnvironment = {};
const mockedEnvWithGitHubActions = {
  IS_GITHUB_APP: "true"
};
const mockedEnvWithGitLabCi = {
  GITLAB_CI: "true"
};

it("should return `false` when the GitHub App is not detected", () => {
  expect(isAppToolDetected(mockedEnvWithUnknownCiEnvironment, "IS_GITHUB_APP")).toBe(false);
});
it("should return `true` when the GitHub App is detected", () => {
  expect(isAppToolDetected(mockedEnvWithGitHubActions, "IS_GITHUB_APP")).toBe(true);
});
it("should return `false` when the GitHub App is not detected because another app environment is used", () => {
  expect(isAppToolDetected(mockedEnvWithGitLabCi, "IS_GITHUB_APP")).toBe(false);
});
