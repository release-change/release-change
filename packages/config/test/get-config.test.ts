import type { CliOptions, Config } from "@release-change/shared";

import { assert, beforeEach, it, vi } from "vitest";

import { getConfigFile } from "../src/get-config-file.js";
import { getRepositoryUrl } from "../src/get-repository-url.js";
import { DEFAULT_CONFIG, getConfig } from "../src/index.js";

const mockedRepositoryUrl = "https://github.com/user-id/repo-name.git";
const mockedRemoteName = "non-origin";
const mockedBranch = "main";
const expectedDefaultConfig = {
  ...DEFAULT_CONFIG,
  repositoryUrl: mockedRepositoryUrl
} as unknown as Config;

vi.mock("../src/get-config-file.js", () => ({
  getConfigFile: vi.fn()
}));
vi.mock("../src/get-repository-url.js", () => ({ getRepositoryUrl: vi.fn() }));

beforeEach(() => {
  vi.mocked(getRepositoryUrl).mockReturnValue(mockedRepositoryUrl);
  vi.mocked(getConfigFile).mockReturnValue(null);
});

it("should get config with default options when `getConfig()` is called without arguments", () => {
  assert.deepEqual(getConfig(), expectedDefaultConfig);
});
it("should get config with default options when `getConfig()` is called without CLI options", () => {
  assert.deepEqual(getConfig({}), expectedDefaultConfig);
});
it("should get config with default options, except for `--branches` or `-b` CLI option", () => {
  const mockedCliOptions: CliOptions = { branches: [mockedBranch] };
  const expectedConfig = {
    ...expectedDefaultConfig,
    ...mockedCliOptions
  };
  assert.deepEqual(getConfig(mockedCliOptions), expectedConfig);
});
it("should get config with default options, except for `--repository-url` or `-r` CLI option", () => {
  const mockedCliOptions: CliOptions = {
    repositoryUrl: mockedRepositoryUrl
  };
  const expectedConfig = {
    ...expectedDefaultConfig,
    ...mockedCliOptions
  };
  assert.deepEqual(getConfig(mockedCliOptions), expectedConfig);
});
it("should get config with default options, except for `--remote-name` CLI option", () => {
  const mockedCliOptions: CliOptions = { remoteName: mockedRemoteName };
  const expectedConfig = {
    ...expectedDefaultConfig,
    ...mockedCliOptions
  };
  assert.deepEqual(getConfig(mockedCliOptions), expectedConfig);
});
it("should get config with default options, except for `--debug` CLI option", () => {
  const mockedCliOptions: CliOptions = { debug: true };
  const expectedConfig = {
    ...expectedDefaultConfig,
    ...mockedCliOptions
  };
  assert.deepEqual(getConfig(mockedCliOptions), expectedConfig);
});
it("should get config with default options, except for `--dry-run` or `-d` CLI option", () => {
  const mockedCliOptions: CliOptions = { dryRun: true };
  const expectedConfig = {
    ...expectedDefaultConfig,
    ...mockedCliOptions
  };
  assert.deepEqual(getConfig(mockedCliOptions), expectedConfig);
});
it("should get config according to all CLI options when all of them are set, whether using aliases or not", () => {
  const mockedCliOptions: CliOptions = {
    branches: [mockedBranch],
    repositoryUrl: mockedRepositoryUrl,
    remoteName: mockedRemoteName,
    debug: true,
    dryRun: true
  };
  const expectedConfig = {
    branches: [mockedBranch],
    repositoryUrl: mockedRepositoryUrl,
    remoteName: mockedRemoteName,
    releaseType: expectedDefaultConfig.releaseType,
    isMonorepo: expectedDefaultConfig.isMonorepo,
    dependencyUpdateMethod: expectedDefaultConfig.dependencyUpdateMethod,
    debug: true,
    dryRun: true
  };
  assert.deepEqual(getConfig(mockedCliOptions), expectedConfig);
});
it("should get config according to CLI options rather than config file", () => {
  const mockedConfigFile = {
    ...expectedDefaultConfig,
    branches: ["main", "next"],
    repositoryUrl: mockedRepositoryUrl,
    remoteName: "origin"
  };
  const mockedCliOptions: CliOptions = { branches: [mockedBranch] };
  const expectedConfig = {
    branches: [mockedBranch],
    repositoryUrl: mockedRepositoryUrl,
    remoteName: "origin",
    releaseType: expectedDefaultConfig.releaseType,
    isMonorepo: expectedDefaultConfig.isMonorepo,
    dependencyUpdateMethod: expectedDefaultConfig.dependencyUpdateMethod,
    debug: false,
    dryRun: false
  };
  vi.mocked(getConfigFile).mockReturnValue(mockedConfigFile);
  assert.deepEqual(getConfig(mockedCliOptions), expectedConfig);
});
