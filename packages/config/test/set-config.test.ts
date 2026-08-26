import type { Config, DependencyUpdateMethod } from "@release-change/shared";

import { assert, describe, it } from "vitest";

import { DEFAULT_CONFIG, setConfig } from "../src/index.js";

const mockedRepositoryUrl = "https://github.com/user-id/repo-name.git";
const mockedRemoteName = "non-origin";
const mockedDefaultConfig = {
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

describe.each(dependencyUpdateMethods)(
  "with `dependencyUpdateMethod` set to %s",
  dependencyUpdateMethod => {
    const mockedIsMonorepo = !!dependencyUpdateMethod;
    it("should set config according to config file", () => {
      const mockedConfigFile = {
        ...mockedDefaultConfig,
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
        releaseType: mockedDefaultConfig.releaseType,
        isMonorepo: mockedIsMonorepo,
        dependencyUpdateMethod,
        debug: false,
        dryRun: false
      };
      assert.deepEqual(setConfig(mockedConfigFile, mockedIsMonorepo), expectedConfig);
    });
    it("should set config according to config file with custom `releaseType`", () => {
      const mockedConfigFile = {
        ...mockedDefaultConfig,
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
      assert.deepEqual(setConfig(mockedConfigFile, mockedIsMonorepo), expectedConfig);
    });
    it("should set config with `dependencyUpdateMethod` set to `null` if it is not a monorepo", () => {
      const mockedConfigFile = {
        ...mockedDefaultConfig,
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
        releaseType: mockedDefaultConfig.releaseType,
        isMonorepo: false,
        dependencyUpdateMethod: null,
        debug: false,
        dryRun: false
      };
      assert.deepEqual(setConfig(mockedConfigFile, false), expectedConfig);
    });
  }
);
