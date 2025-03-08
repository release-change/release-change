import type { Config } from "../../src/config/config.types.js";

import { assert, describe, it, vi } from "vitest";

import { parseCliOptions } from "../../src/cli/parse-cli-options.js";
import { getConfigFile } from "../../src/config/get-config-file.js";
import { getConfig } from "../../src/config/get-config.js";

import { DEFAULT_CONFIG } from "../../src/config/constants.js";

describe("get config", () => {
  const expectedDefaultConfig = {
    ...DEFAULT_CONFIG,
    repositoryUrl: "https://github.com/release-change/release-change.git",
    remoteName: "origin"
  } as unknown as Config;
  const mockedRepositoryUrl = "https://github.com/user-id/repo-name.git";
  const mockedBranch = "main";

  vi.mock("../../src/config/get-config-file.js", () => ({
    getConfigFile: vi.fn()
  }));

  it("should get config with default options when `config()` is called without arguments", async () => {
    assert.deepEqual(await getConfig(), expectedDefaultConfig);
  });
  it("should get config with default options when `config()` is called without CLI options", async () => {
    const { help, version, ...mockedCliOptions } = parseCliOptions([]);
    assert.deepEqual(await getConfig(mockedCliOptions), expectedDefaultConfig);
  });
  it("should get config with default options, except for `--branches` CLI option", async () => {
    const { help, version, ...mockedCliOptions } = parseCliOptions(["--branches", mockedBranch]);
    const expectedConfig = {
      ...expectedDefaultConfig,
      ...{ branches: [mockedBranch] }
    };
    assert.deepEqual(await getConfig(mockedCliOptions), expectedConfig);
  });
  it("should get config with default options, except for `-b` CLI option", async () => {
    const { help, version, ...cliOptions } = parseCliOptions(["-b", mockedBranch]);
    const expectedConfig = {
      ...expectedDefaultConfig,
      ...{ branches: [mockedBranch] }
    };
    assert.deepEqual(await getConfig(cliOptions), expectedConfig);
  });
  it("should get config with default options, except for `--repository-url` CLI option", async () => {
    const { help, version, ...mockedCliOptions } = parseCliOptions([
      "--repository-url",
      mockedRepositoryUrl
    ]);
    const expectedConfig = {
      ...expectedDefaultConfig,
      ...{ repositoryUrl: mockedRepositoryUrl }
    };
    assert.deepEqual(await getConfig(mockedCliOptions), expectedConfig);
  });
  it("should get config with default options, except for `-r` CLI option", async () => {
    const { help, version, ...cliOptions } = parseCliOptions(["-r", mockedRepositoryUrl]);
    const expectedConfig = {
      ...expectedDefaultConfig,
      ...{ repositoryUrl: mockedRepositoryUrl }
    };
    assert.deepEqual(await getConfig(cliOptions), expectedConfig);
  });
  it("should get config with default options, except for `--debug` CLI option", async () => {
    const { help, version, ...mockedCliOptions } = parseCliOptions(["--debug"]);
    const expectedConfig = {
      ...expectedDefaultConfig,
      ...{ debug: true }
    };
    assert.deepEqual(await getConfig(mockedCliOptions), expectedConfig);
  });
  it("should get config with default options, except for `--dry-run` CLI option", async () => {
    const { help, version, ...mockedCliOptions } = parseCliOptions(["--dry-run"]);
    const expectedConfig = {
      ...expectedDefaultConfig,
      ...{ dryRun: true }
    };
    assert.deepEqual(await getConfig(mockedCliOptions), expectedConfig);
  });
  it("should get config with default options, except for `-d` CLI option", async () => {
    const { help, version, ...mockedCliOptions } = parseCliOptions(["-d"]);
    const expectedConfig = {
      ...expectedDefaultConfig,
      ...{ dryRun: true }
    };
    assert.deepEqual(await getConfig(mockedCliOptions), expectedConfig);
  });
  it("should get config according to all CLI options when all of them are set", async () => {
    const { help, version, ...mockedCliOptions } = parseCliOptions([
      "--branches",
      mockedBranch,
      "--repository-url",
      mockedRepositoryUrl,
      "--debug",
      "--dry-run"
    ]);
    const expectedConfig = {
      branches: [mockedBranch],
      repositoryUrl: mockedRepositoryUrl,
      remoteName: "origin",
      releaseType: expectedDefaultConfig.releaseType,
      debug: true,
      dryRun: true
    };
    assert.deepEqual(await getConfig(mockedCliOptions), expectedConfig);
  });
  it("should get config according to all CLI options when all of them are set using aliases", async () => {
    const { help, version, ...mockedCliOptions } = parseCliOptions([
      "-b",
      mockedBranch,
      "-r",
      mockedRepositoryUrl,
      "--debug",
      "-d"
    ]);
    const expectedConfig = {
      branches: [mockedBranch],
      repositoryUrl: mockedRepositoryUrl,
      remoteName: "origin",
      releaseType: expectedDefaultConfig.releaseType,
      debug: true,
      dryRun: true
    };
    assert.deepEqual(await getConfig(mockedCliOptions), expectedConfig);
  });
  it("should get config according to config file", async () => {
    const mockedConfigFile = {
      branches: ["main", "next"],
      repositoryUrl: mockedRepositoryUrl
    };
    const { help, version, ...mockedCliOptions } = parseCliOptions([]);
    const expectedConfig = {
      branches: ["main", "next"],
      repositoryUrl: mockedRepositoryUrl,
      remoteName: "origin",
      releaseType: expectedDefaultConfig.releaseType,
      debug: false,
      dryRun: false
    };
    vi.mocked(getConfigFile).mockReturnValue(mockedConfigFile);
    assert.deepEqual(await getConfig(mockedCliOptions), expectedConfig);
  });
  it("should get config according to config file with custom `releaseType`", async () => {
    const mockedConfigFile = {
      branches: ["main", "next"],
      repositoryUrl: mockedRepositoryUrl,
      remoteName: "origin",
      releaseType: {
        next: {
          channel: "rc"
        }
      }
    };
    const { help, version, ...mockedCliOptions } = parseCliOptions([]);
    const expectedConfig = {
      branches: ["main", "next"],
      repositoryUrl: mockedRepositoryUrl,
      remoteName: "origin",
      releaseType: {
        next: {
          channel: "rc"
        }
      },
      debug: false,
      dryRun: false
    };
    vi.mocked(getConfigFile).mockReturnValue(mockedConfigFile);
    assert.deepEqual(await getConfig(mockedCliOptions), expectedConfig);
  });
  it("should get config according to CLI options rather than config file", async () => {
    const mockedConfigFile = {
      branches: ["main", "next"],
      repositoryUrl: mockedRepositoryUrl,
      remoteName: "origin"
    };
    const { help, version, ...mockedCliOptions } = parseCliOptions(["--branches", mockedBranch]);
    const expectedConfig = {
      branches: [mockedBranch],
      repositoryUrl: mockedRepositoryUrl,
      remoteName: "origin",
      releaseType: expectedDefaultConfig.releaseType,
      debug: false,
      dryRun: false
    };
    vi.mocked(getConfigFile).mockReturnValue(mockedConfigFile);
    assert.deepEqual(await getConfig(mockedCliOptions), expectedConfig);
  });
});
