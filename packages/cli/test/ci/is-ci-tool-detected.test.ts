import { expect, it } from "vitest";

import { isCiToolDetected } from "../../src/ci/is-ci-tool-detected.js";

const mockedEnvWithUnknownCiEnvironment = {};
const mockedEnvWithGitHubActions = {
  GITHUB_ACTIONS: "true"
};
const mockedEnvWithGitLabCi = {
  GITLAB_CI: "true"
};

it("should return `false` when GitHub Actions is not detected", () => {
  expect(isCiToolDetected(mockedEnvWithUnknownCiEnvironment, "GITHUB_ACTIONS")).toBe(false);
});
it("should return `true` when GitHub Actions is detected", () => {
  expect(isCiToolDetected(mockedEnvWithGitHubActions, "GITHUB_ACTIONS")).toBe(true);
});
it("should return `false` when GitHub Actions is not detected because another CI environment is used", () => {
  expect(isCiToolDetected(mockedEnvWithGitLabCi, "GITHUB_ACTIONS")).toBe(false);
});
