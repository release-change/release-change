import type { Config } from "../../src/config/config.types.js";

import { assert, describe, expect, it, vi } from "vitest";

import { parseCliOptions } from "../../src/cli/parse-cli-options.js";
import { debugConfig } from "../../src/config/debug-config.js";
import { getConfigFile } from "../../src/config/get-config-file.js";
import { getConfig } from "../../src/config/index.js";

import { DEFAULT_CONFIG } from "../../src/config/constants.js";

describe("get config", () => {
  const expectedDefaultConfig = DEFAULT_CONFIG as unknown as Config;
  const mockedBranch = "main";
  const mockedRepositoryUrl = "https://github.com/release-change/release-change";
  const mockedContext = {
    cwd: "/fake/path",
    env: {},
    config: expectedDefaultConfig,
    logger: {
      logDebug: vi.fn(),
      logInfo: vi.fn(),
      logError: vi.fn(),
      logWarn: vi.fn(),
      logSuccess: vi.fn()
    }
  };

  vi.mock("../../src/config/get-config-file.js", () => ({
    getConfigFile: vi.fn()
  }));

  it("should get config with default options when `config()` is called without arguments", () => {
    assert.deepEqual(getConfig(), expectedDefaultConfig);
  });
  it("should get config with default options when `config()` is called without CLI options", () => {
    const { help, version, ...mockedCliOptions } = parseCliOptions([]);
    assert.deepEqual(getConfig(mockedCliOptions), expectedDefaultConfig);
  });
  it("should get config with default options, except for `--branches` CLI option", () => {
    const { help, version, ...mockedCliOptions } = parseCliOptions(["--branches", mockedBranch]);
    const expectedConfig = {
      ...expectedDefaultConfig,
      ...{ branches: [mockedBranch] }
    };
    assert.deepEqual(getConfig(mockedCliOptions), expectedConfig);
  });
  it("should get config with default options, except for `-b` CLI option", () => {
    const { help, version, ...cliOptions } = parseCliOptions(["-b", mockedBranch]);
    const expectedConfig = {
      ...expectedDefaultConfig,
      ...{ branches: [mockedBranch] }
    };
    assert.deepEqual(getConfig(cliOptions), expectedConfig);
  });
  it("should get config with default options, except for `--repository-url` CLI option", () => {
    const { help, version, ...mockedCliOptions } = parseCliOptions([
      "--repository-url",
      mockedRepositoryUrl
    ]);
    const expectedConfig = {
      ...expectedDefaultConfig,
      ...{ repositoryUrl: mockedRepositoryUrl }
    };
    assert.deepEqual(getConfig(mockedCliOptions), expectedConfig);
  });
  it("should get config with default options, except for `-r` CLI option", () => {
    const { help, version, ...cliOptions } = parseCliOptions(["-r", mockedRepositoryUrl]);
    const expectedConfig = {
      ...expectedDefaultConfig,
      ...{ repositoryUrl: mockedRepositoryUrl }
    };
    assert.deepEqual(getConfig(cliOptions), expectedConfig);
  });
  it("should get config with default options, except for `--debug` CLI option", () => {
    const { help, version, ...mockedCliOptions } = parseCliOptions(["--debug"]);
    const expectedConfig = {
      ...expectedDefaultConfig,
      ...{ debug: true }
    };
    assert.deepEqual(getConfig(mockedCliOptions), expectedConfig);
  });
  it("should get config with default options, except for `--dry-run` CLI option", () => {
    const { help, version, ...mockedCliOptions } = parseCliOptions(["--dry-run"]);
    const expectedConfig = {
      ...expectedDefaultConfig,
      ...{ dryRun: true }
    };
    assert.deepEqual(getConfig(mockedCliOptions), expectedConfig);
  });
  it("should get config with default options, except for `-d` CLI option", () => {
    const { help, version, ...mockedCliOptions } = parseCliOptions(["-d"]);
    const expectedConfig = {
      ...expectedDefaultConfig,
      ...{ dryRun: true }
    };
    assert.deepEqual(getConfig(mockedCliOptions), expectedConfig);
  });
  it("should get config according to all CLI options when all of them are set", () => {
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
      releaseType: expectedDefaultConfig.releaseType,
      debug: true,
      dryRun: true
    };
    assert.deepEqual(getConfig(mockedCliOptions), expectedConfig);
  });
  it("should get config according to all CLI options when all of them are set using aliases", () => {
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
      releaseType: expectedDefaultConfig.releaseType,
      debug: true,
      dryRun: true
    };
    assert.deepEqual(getConfig(mockedCliOptions), expectedConfig);
  });
  it("should get config according to config file", () => {
    const mockedConfigFile = {
      branches: ["main", "next"],
      repositoryUrl: mockedRepositoryUrl
    };
    const { help, version, ...mockedCliOptions } = parseCliOptions([]);
    const expectedConfig = {
      branches: ["main", "next"],
      repositoryUrl: mockedRepositoryUrl,
      releaseType: expectedDefaultConfig.releaseType,
      debug: false,
      dryRun: false
    };
    vi.mocked(getConfigFile).mockReturnValue(mockedConfigFile);
    assert.deepEqual(getConfig(mockedCliOptions), expectedConfig);
  });
  it("should get config according to config file with custom `releaseType`", () => {
    const mockedConfigFile = {
      branches: ["main", "next"],
      repositoryUrl: mockedRepositoryUrl,
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
      releaseType: {
        next: {
          channel: "rc"
        }
      },
      debug: false,
      dryRun: false
    };
    vi.mocked(getConfigFile).mockReturnValue(mockedConfigFile);
    assert.deepEqual(getConfig(mockedCliOptions), expectedConfig);
  });
  it("should get config according to CLI options rather than config file", () => {
    const mockedConfigFile = {
      branches: ["main", "next"],
      repositoryUrl: mockedRepositoryUrl
    };
    const { help, version, ...mockedCliOptions } = parseCliOptions(["--branches", mockedBranch]);
    const expectedConfig = {
      branches: [mockedBranch],
      repositoryUrl: mockedRepositoryUrl,
      releaseType: expectedDefaultConfig.releaseType,
      debug: false,
      dryRun: false
    };
    vi.mocked(getConfigFile).mockReturnValue(mockedConfigFile);
    assert.deepEqual(getConfig(mockedCliOptions), expectedConfig);
  });
  it("should not log debug logs when not in debug mode", () => {
    debugConfig(mockedContext);
    expect(mockedContext.logger.logDebug).not.toHaveBeenCalled();
  });
  it("should log debug logs when in debug mode", () => {
    mockedContext.config.debug = true;
    debugConfig(mockedContext);
    expect(mockedContext.logger.logDebug).toHaveBeenCalled();
  });
});
