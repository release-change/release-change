import type { Context } from "../../src/cli/cli.types.js";
import type { Logger } from "../../src/logger/logger.types.js";
import type { LastRelease } from "../../src/release/release.types.js";

import { assert, afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getAllTags } from "../../src/git/get-all-tags.js";
import { getLatestValidTag } from "../../src/git/get-latest-valid-tag.js";
import * as setLoggerModule from "../../src/logger/set-logger.js";
import { getRootPackageVersion } from "../../src/release/get-root-package-version.js";
import { setLastRelease } from "../../src/release/set-last-release.js";

describe("set last release", () => {
  const mockedRepositoryUrl = "https://github.com/user-id/repo-name";
  const mockedConfig = {
    branches: ["alpha", "beta", "main", "master", "next"],
    releaseType: {
      alpha: {
        channel: "alpha",
        prerelease: true,
        prereleaseIdentifier: "alpha"
      },
      beta: {
        channel: "beta",
        prerelease: true,
        prereleaseIdentifier: "beta"
      },
      main: {
        channel: "default"
      },
      next: {
        channel: "next",
        prerelease: true,
        prereleaseIdentifier: "rc"
      }
    },
    debug: false,
    dryRun: false,
    repositoryUrl: mockedRepositoryUrl,
    remoteName: "origin"
  };
  const mockedContext = {
    cwd: "/fake/path",
    env: {},
    config: mockedConfig,
    branch: "main"
  } as Context;
  const mockedContextWithInelegibleBranch = { ...mockedContext, branch: "unmatched-branch" };
  const mockedLogger: Logger = {
    setDebugScope: vi.fn(),
    logDebug: vi.fn(),
    logInfo: vi.fn(),
    logError: vi.fn(),
    logWarn: vi.fn(),
    logSuccess: vi.fn()
  };
  const mockedGitTags = [
    "v2.0.0",
    "v2.0.0-rc.2",
    "v2.0.0-rc.1",
    "v2.0.0-beta.3",
    "v2.0.0-beta.2",
    "v2.0.0-beta.1",
    "v2.0.0-alpha.4",
    "v2.0.0-alpha.3",
    "v2.0.0-alpha.2",
    "v2.0.0-alpha.1",
    "v1.1.0",
    "v1.0.1",
    "v1.0.0",
    "v0.2.0",
    "v0.1.0"
  ];
  const mockedPackageVersion = "1.0.0";
  const mockedContexts = [
    {
      branch: "main",
      gitTag: "v2.0.0",
      version: "2.0.0"
    },
    {
      branch: "next",
      gitTag: "v2.0.0-rc.2",
      version: "2.0.0-rc.2"
    },
    {
      branch: "beta",
      gitTag: "v2.0.0-beta.3",
      version: "2.0.0-beta.3"
    },
    {
      branch: "alpha",
      gitTag: "v2.0.0-alpha.4",
      version: "2.0.0-alpha.4"
    }
  ];

  beforeEach(() => {
    vi.spyOn(setLoggerModule, "setLogger").mockReturnValue(mockedLogger);
    vi.mock("../../src/git/get-all-tags.js", () => ({
      getAllTags: vi.fn()
    }));
    vi.mock("../../src/git/get-latest-valid-tag.js", () => ({
      getLatestValidTag: vi.fn()
    }));
    vi.mock("../../src/release/get-root-package-version.js", () => ({
      getRootPackageVersion: vi.fn()
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should not call `getLatestValidTag()` if the package cannot publish from the branch", () => {
    setLastRelease(mockedContextWithInelegibleBranch);
    expect(getLatestValidTag).not.toHaveBeenCalled();
  });
  it.each(mockedContexts)(
    "should add the last release to the context with `gitTag` set to the Git tag value and `version` set to the version inferred from the Git tag if a Git tag is found on branch $branch",
    ({ branch, gitTag, version }) => {
      const context = { ...mockedContext, branch };
      const expectedLastRelease: LastRelease = { gitTag, version: version };
      const expectedContext = { ...context, lastRelease: expectedLastRelease };
      vi.mocked(getAllTags).mockReturnValue(mockedGitTags);
      vi.mocked(getLatestValidTag).mockReturnValue(gitTag);
      setLastRelease(context);
      assert.deepEqual(context, expectedContext);
      expect(mockedLogger.logInfo).toHaveBeenCalledWith(
        `Found Git tag ${gitTag} associated with version ${version} on branch ${branch}.`
      );
    }
  );
  it.each(mockedContexts)(
    "should add the last release to the context with `gitTag` set to `null` and `version` set to the package version value if no Git tags are found on branch $branch, but a package version is found",
    ({ branch }) => {
      const context = { ...mockedContext, branch };
      const expectedLastRelease: LastRelease = { gitTag: null, version: mockedPackageVersion };
      const expectedContext = {
        ...context,
        lastRelease: expectedLastRelease
      };
      vi.mocked(getAllTags).mockReturnValue([]);
      vi.mocked(getLatestValidTag).mockReturnValue(null);
      vi.mocked(getRootPackageVersion).mockReturnValue(mockedPackageVersion);
      setLastRelease(context);
      assert.deepEqual(context, expectedContext);
      expect(mockedLogger.logInfo).toHaveBeenCalledWith(
        `No Git tag version found on branch ${branch}.`
      );
      expect(mockedLogger.logInfo).toHaveBeenCalledWith(
        `Found package version ${mockedPackageVersion} on branch ${branch}.`
      );
    }
  );
  it('should add the last release to the context with `gitTag` set to `null` and `version` set to "0.0.0" if no Git tags nor package versions are found', () => {
    const expectedLastRelease: LastRelease = { gitTag: null, version: "0.0.0" };
    const expectedContext = {
      ...mockedContext,
      lastRelease: expectedLastRelease
    };
    vi.mocked(getAllTags).mockReturnValue([]);
    vi.mocked(getRootPackageVersion).mockReturnValue(undefined);
    setLastRelease(mockedContext);
    assert.deepEqual(mockedContext, expectedContext);
    expect(mockedLogger.logInfo).toHaveBeenCalledWith("No package version found.");
  });
});
