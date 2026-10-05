import fs from "node:fs";

import { describe, expect, it, vi } from "vitest";

import { getPackageManager, getRootPackageManifest } from "../src/index.js";
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
const mockedEnvWithYarnVersion = {
  npm_config_user_agent: "yarn/4.18.1 npm/? node/v22.15.0 darwin x64"
};
const mockedEnvWithUnknownNpmVersion = {
  npm_config_user_agent: "npm/? node/v22.15.0 darwin x64"
};
const mockedPackageManifest = {
  name: "sample",
  version: "1.2.3"
};

vi.mock("../src/get-root-package-manifest.js", () => ({
  getRootPackageManifest: vi.fn()
}));

it("should return `pnpm` if the `pnpm-lock.yaml` file exists", () => {
  vi.spyOn(fs, "existsSync").mockReturnValueOnce(true);
  expect(getPackageManager(mockedCwd, mockedEnvWithoutNpmConfigUserAgent)).toBe("pnpm");
});
it("should return `yarn` if the `yarn.lock` file exists", () => {
  vi.spyOn(fs, "existsSync").mockReturnValueOnce(false);
  vi.spyOn(fs, "existsSync").mockReturnValueOnce(true);
  expect(getPackageManager(mockedCwd, mockedEnvWithoutNpmConfigUserAgent)).toBe("yarn");
});
it("should return `npm` if the `package-lock.json` file exists", () => {
  vi.spyOn(fs, "existsSync").mockReturnValueOnce(false);
  vi.spyOn(fs, "existsSync").mockReturnValueOnce(false);
  vi.spyOn(fs, "existsSync").mockReturnValueOnce(true);
  expect(getPackageManager(mockedCwd, mockedEnvWithoutNpmConfigUserAgent)).toBe("npm");
});
describe("when no lock files are found", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(false);
  it("should return `pnpm` if the `packageManager` property is set in the `package.json` file and says pnpm", () => {
    vi.mocked(getRootPackageManifest).mockReturnValue({
      ...mockedPackageManifest,
      packageManager: "pnpm@11.1.3"
    });
    expect(getPackageManager(mockedCwd, mockedEnvWithoutNpmConfigUserAgent)).toBe("pnpm");
  });
  it("should return `yarn` if the `packageManager` property is set in the `package.json` file and says yarn", () => {
    vi.mocked(getRootPackageManifest).mockReturnValue({
      ...mockedPackageManifest,
      packageManager: "yarn@4.9.0"
    });
    expect(getPackageManager(mockedCwd, mockedEnvWithoutNpmConfigUserAgent)).toBe("yarn");
  });
  it("should return `npm` if the `packageManager` property is set in the `package.json` file and says npm", () => {
    vi.mocked(getRootPackageManifest).mockReturnValue({
      ...mockedPackageManifest,
      packageManager: "npm@10.9.0"
    });
    expect(getPackageManager(mockedCwd, mockedEnvWithoutNpmConfigUserAgent)).toBe("npm");
  });
  it("should return `null` if the `npm_config_user_agent` environment variable is not set", () => {
    vi.mocked(getRootPackageManifest).mockReturnValue(mockedPackageManifest);
    expect(getPackageManager(mockedCwd, mockedEnvWithoutNpmConfigUserAgent)).toBe(null);
  });
  it("should return `npm` if the `npm_config_user_agent` environment variable is set with a version of `npm`", () => {
    expect(getPackageManager(mockedCwd, mockedEnvWithNpmVersion)).toBe("npm");
  });
  it("should return `pnpm` if the `npm_config_user_agent` environment variable is set with a version of `pnpm`", () => {
    expect(getPackageManager(mockedCwd, mockedEnvWithPnpmVersion)).toBe("pnpm");
  });
  it("should return `yarn` if the `npm_config_user_agent` environment variable is set with a version of `yarn`", () => {
    expect(getPackageManager(mockedCwd, mockedEnvWithYarnVersion)).toBe("yarn");
  });
  it("should return `null` if the `npm_config_user_agent` environment variable is set without any version of `npm`, `pnpm` and `yarn`", () => {
    expect(getPackageManager(mockedCwd, mockedEnvWithTruncatedNpmConfigUserAgent)).toBe(null);
  });
  it("should return `null` if the `npm_config_user_agent` environment variable is set with an unknown version of `npm`", () => {
    expect(getPackageManager(mockedCwd, mockedEnvWithUnknownNpmVersion)).toBe(null);
  });
  it("should return `pnpm` if the `PNPM_HOME` environment variable is set", () => {
    expect(getPackageManager(mockedCwd, { PNPM_HOME: "/Users/username/Library/pnpm" })).toBe(
      "pnpm"
    );
  });
});
