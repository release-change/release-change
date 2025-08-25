import { expect, it } from "vitest";

import { getPackageManager } from "../src/get-package-manager.js";

const mockedEnvWithoutNpmConfigUserAgent = {};
const mockedEnvWithTruncatedNpmConfigUserAgent = {
  npm_config_user_agent: "node/v22.15.0 darwin x64"
};
const mockedEnvWithNpmVersion = {
  npm_config_user_agent: "npm/10.9.2 node/v22.15.0 darwin x64"
};
const mockedEnvWithPnpmVersion = {
  npm_config_user_agent: "pnpm/10.10.0 npm/? node/v22.15.0 darwin x64"
};

it("should return `null` if the `npm_config_user_agent` environment variable is not set", () => {
  expect(getPackageManager(mockedEnvWithoutNpmConfigUserAgent)).toBe(null);
});
it("should return `npm` if the `npm_config_user_agent` environment variable is set with a version of `npm`", () => {
  expect(getPackageManager(mockedEnvWithNpmVersion)).toBe("npm");
});
it("should return `npm` if the `npm_config_user_agent` environment variable is set with a version of `pnpm`", () => {
  expect(getPackageManager(mockedEnvWithPnpmVersion)).toBe("pnpm");
});
it("should return `null` if the `npm_config_user_agent` environment variable is set without any version of `npm` and `pnpm`", () => {
  expect(getPackageManager(mockedEnvWithTruncatedNpmConfigUserAgent)).toBe(null);
});
