import type { CliOptions, Config, DependencyUpdateMethod } from "@release-change/shared";

import { afterEach, assert, beforeEach, describe, it, vi } from "vitest";

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
const dependencyUpdateMethods: DependencyUpdateMethod[] = [
  null,
  "pin",
  "workspace",
  "caret-range",
  "tilde-range"
];

beforeEach(() => {
  vi.mock("../src/get-config-file.js", () => ({
    getConfigFile: vi.fn()
  }));
  vi.mock("../src/get-repository-url.js", () => ({ getRepositoryUrl: vi.fn() }));
  vi.mocked(getRepositoryUrl).mockReturnValue(mockedRepositoryUrl);
  vi.mocked(getConfigFile).mockReturnValue(null);
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should get config with default options when `config()` is called without arguments", async () => {
  assert.deepEqual(await getConfig(), expectedDefaultConfig);
});
it("should get config with default options when `config()` is called without CLI options", async () => {
  assert.deepEqual(await getConfig({}), expectedDefaultConfig);
});
it("should get config with default options, except for `--branches` or `-b` CLI option", async () => {
  const mockedCliOptions: CliOptions = { branches: [mockedBranch] };
  const expectedConfig = {
    ...expectedDefaultConfig,
    ...mockedCliOptions
  };
  assert.deepEqual(await getConfig(mockedCliOptions), expectedConfig);
});
it("should get config with default options, except for `--repository-url` or `-r` CLI option", async () => {
  const mockedCliOptions: CliOptions = {
    repositoryUrl: mockedRepositoryUrl
  };
  const expectedConfig = {
    ...expectedDefaultConfig,
    ...mockedCliOptions
  };
  assert.deepEqual(await getConfig(mockedCliOptions), expectedConfig);
});
it("should get config with default options, except for `--remote-name` CLI option", async () => {
  const mockedCliOptions: CliOptions = { remoteName: mockedRemoteName };
  const expectedConfig = {
    ...expectedDefaultConfig,
    ...mockedCliOptions
  };
  assert.deepEqual(await getConfig(mockedCliOptions), expectedConfig);
});
it("should get config with default options, except for `--debug` CLI option", async () => {
  const mockedCliOptions: CliOptions = { debug: true };
  const expectedConfig = {
    ...expectedDefaultConfig,
    ...mockedCliOptions
  };
  assert.deepEqual(await getConfig(mockedCliOptions), expectedConfig);
});
it("should get config with default options, except for `--dry-run` or `-d` CLI option", async () => {
  const mockedCliOptions: CliOptions = { dryRun: true };
  const expectedConfig = {
    ...expectedDefaultConfig,
    ...mockedCliOptions
  };
  assert.deepEqual(await getConfig(mockedCliOptions), expectedConfig);
});
it("should get config according to all CLI options when all of them are set, whether using aliases or not", async () => {
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
  assert.deepEqual(await getConfig(mockedCliOptions), expectedConfig);
});
describe.each(dependencyUpdateMethods)(
  "with `dependencyUpdateMethod` set to %s",
  dependencyUpdateMethod => {
    const mockedIsMonorepo = !!dependencyUpdateMethod;
    const mockedCliOptions: CliOptions = {};
    it("should get config according to config file", async () => {
      const mockedConfigFile = {
        ...expectedDefaultConfig,
        branches: ["main", "next"],
        repositoryUrl: mockedRepositoryUrl,
        remoteName: mockedRemoteName,
        isMonorepo: mockedIsMonorepo,
        dependencyUpdateMethod
      };
      const expectedConfig = {
        branches: ["main", "next"],
        repositoryUrl: mockedRepositoryUrl,
        remoteName: mockedRemoteName,
        releaseType: expectedDefaultConfig.releaseType,
        isMonorepo: mockedIsMonorepo,
        dependencyUpdateMethod,
        debug: false,
        dryRun: false
      };
      vi.mocked(getConfigFile).mockReturnValue(mockedConfigFile);
      assert.deepEqual(await getConfig(mockedCliOptions, mockedIsMonorepo), expectedConfig);
    });
    it("should get config according to config file with custom `releaseType`", async () => {
      const mockedConfigFile = {
        ...expectedDefaultConfig,
        branches: ["main", "next"],
        repositoryUrl: mockedRepositoryUrl,
        remoteName: mockedRemoteName,
        releaseType: {
          next: {
            channel: "rc"
          }
        },
        isMonorepo: mockedIsMonorepo,
        dependencyUpdateMethod
      };
      const expectedConfig = {
        branches: ["main", "next"],
        repositoryUrl: mockedRepositoryUrl,
        remoteName: mockedRemoteName,
        releaseType: {
          next: {
            channel: "rc"
          }
        },
        isMonorepo: mockedIsMonorepo,
        dependencyUpdateMethod,
        debug: false,
        dryRun: false
      };
      vi.mocked(getConfigFile).mockReturnValue(mockedConfigFile);
      assert.deepEqual(await getConfig(mockedCliOptions, mockedIsMonorepo), expectedConfig);
    });
  }
);
it("should get config according to CLI options rather than config file", async () => {
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
  assert.deepEqual(await getConfig(mockedCliOptions), expectedConfig);
});
