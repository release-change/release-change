import fs from "node:fs";

import { describe, expect, it, vi } from "vitest";

import { getPackageManager } from "../src/get-package-manager.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";

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

it("should return `pnpm` if the `pnpm-lock.yaml` file exists", () => {
  vi.spyOn(fs, "existsSync").mockReturnValueOnce(true);
  expect(getPackageManager(mockedCwd, mockedEnvWithoutNpmConfigUserAgent)).toBe("pnpm");
});
it("should return `npm` if the `package-lock.json` file exists", () => {
  vi.spyOn(fs, "existsSync").mockReturnValueOnce(false);
  vi.spyOn(fs, "existsSync").mockReturnValueOnce(true);
  expect(getPackageManager(mockedCwd, mockedEnvWithoutNpmConfigUserAgent)).toBe("npm");
});
describe("when no lock files are found", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(false);
  it("should return `pnpm` if the `PNPM_HOME` environment variable is set", () => {
    expect(getPackageManager(mockedCwd, { PNPM_HOME: "/Users/username/Library/pnpm" })).toBe(
      "pnpm"
    );
  });
  it("should return `null` if the `npm_config_user_agent` environment variable is not set", () => {
    expect(getPackageManager(mockedCwd, mockedEnvWithoutNpmConfigUserAgent)).toBe(null);
  });
  it("should return `npm` if the `npm_config_user_agent` environment variable is set with a version of `npm`", () => {
    expect(getPackageManager(mockedCwd, mockedEnvWithNpmVersion)).toBe("npm");
  });
  it("should return `pnpm` if the `npm_config_user_agent` environment variable is set with a version of `pnpm`", () => {
    expect(getPackageManager(mockedCwd, mockedEnvWithPnpmVersion)).toBe("pnpm");
  });
  it("should return `null` if the `npm_config_user_agent` environment variable is set without any version of `npm` and `pnpm`", () => {
    expect(getPackageManager(mockedCwd, mockedEnvWithTruncatedNpmConfigUserAgent)).toBe(null);
  });
});
