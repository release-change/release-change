import type { Context } from "../../src/cli/cli.types.js";
import type { ReleaseType } from "../../src/commit-analyser/commit-analyser.types.js";
import type { Config } from "../../src/config/config.types.js";
import type { Logger } from "../../src/logger/logger.types.js";
import type { NextRelease } from "../../src/release/release.types.js";

import { afterEach, assert, beforeEach, describe, expect, it, vi } from "vitest";

import * as setLoggerModule from "../../src/logger/set-logger.js";
import * as incrementVersionModule from "../../src/release/increment-version.js";
import { incrementVersion } from "../../src/release/increment-version.js";
import { setNextRelease } from "../../src/release/set-next-release.js";

describe("set next release", () => {
  const mockedReleaseTypes = ["major", "minor", "patch"];
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
  } as Config;
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
  const mockedReleases: {
    currentVersion: string;
    branches: {
      [branch: string]: {
        [release: string]: string;
      };
    };
  }[] = [
    {
      currentVersion: "0.0.0",
      branches: {
        main: {
          major: "1.0.0",
          minor: "0.1.0",
          patch: "0.0.1"
        },
        alpha: {
          major: "1.0.0-alpha.1",
          minor: "0.1.0-alpha.1",
          patch: "0.0.1-alpha.1"
        },
        beta: {
          major: "1.0.0-beta.1",
          minor: "0.1.0-beta.1",
          patch: "0.0.1-beta.1"
        },
        next: {
          major: "1.0.0-rc.1",
          minor: "0.1.0-rc.1",
          patch: "0.0.1-rc.1"
        }
      }
    },
    {
      currentVersion: "1.0.0-alpha.1",
      branches: {
        main: {
          major: "1.0.0",
          minor: "1.0.0",
          patch: "1.0.0"
        },
        alpha: {
          major: "1.0.0-alpha.2",
          minor: "1.0.0-alpha.2",
          patch: "1.0.0-alpha.2"
        },
        beta: {
          major: "1.0.0-beta.1",
          minor: "1.0.0-beta.1",
          patch: "1.0.0-beta.1"
        },
        next: {
          major: "1.0.0-rc.1",
          minor: "1.0.0-rc.1",
          patch: "1.0.0-rc.1"
        }
      }
    },
    {
      currentVersion: "1.0.0-beta.1",
      branches: {
        main: {
          major: "1.0.0",
          minor: "1.0.0",
          patch: "1.0.0"
        },
        alpha: {
          major: "1.0.0-alpha.1",
          minor: "1.0.0-alpha.1",
          patch: "1.0.0-alpha.1"
        },
        beta: {
          major: "1.0.0-beta.2",
          minor: "1.0.0-beta.2",
          patch: "1.0.0-beta.2"
        },
        next: {
          major: "1.0.0-rc.1",
          minor: "1.0.0-rc.1",
          patch: "1.0.0-rc.1"
        }
      }
    },
    {
      currentVersion: "1.0.0-rc.1",
      branches: {
        main: {
          major: "1.0.0",
          minor: "1.0.0",
          patch: "1.0.0"
        },
        alpha: {
          major: "1.0.0-alpha.1",
          minor: "1.0.0-alpha.1",
          patch: "1.0.0-alpha.1"
        },
        beta: {
          major: "1.0.0-beta.1",
          minor: "1.0.0-beta.1",
          patch: "1.0.0-beta.1"
        },
        next: {
          major: "1.0.0-rc.2",
          minor: "1.0.0-rc.2",
          patch: "1.0.0-rc.2"
        }
      }
    },
    {
      currentVersion: "1.0.0",
      branches: {
        main: {
          major: "2.0.0",
          minor: "1.1.0",
          patch: "1.0.1"
        },
        alpha: {
          major: "2.0.0-alpha.1",
          minor: "1.1.0-alpha.1",
          patch: "1.0.1-alpha.1"
        },
        beta: {
          major: "2.0.0-beta.1",
          minor: "1.1.0-beta.1",
          patch: "1.0.1-beta.1"
        },
        next: {
          major: "2.0.0-rc.1",
          minor: "1.1.0-rc.1",
          patch: "1.0.1-rc.1"
        }
      }
    },
    {
      currentVersion: "1.0.1-alpha.1",
      branches: {
        main: {
          major: "1.0.1",
          minor: "1.0.1",
          patch: "1.0.1"
        },
        alpha: {
          major: "1.0.1-alpha.2",
          minor: "1.0.1-alpha.2",
          patch: "1.0.1-alpha.2"
        },
        beta: {
          major: "1.0.1-beta.1",
          minor: "1.0.1-beta.1",
          patch: "1.0.1-beta.1"
        },
        next: {
          major: "1.0.1-rc.1",
          minor: "1.0.1-rc.1",
          patch: "1.0.1-rc.1"
        }
      }
    },
    {
      currentVersion: "1.0.1-beta.1",
      branches: {
        main: {
          major: "1.0.1",
          minor: "1.0.1",
          patch: "1.0.1"
        },
        alpha: {
          major: "1.0.1-alpha.1",
          minor: "1.0.1-alpha.1",
          patch: "1.0.1-alpha.1"
        },
        beta: {
          major: "1.0.1-beta.2",
          minor: "1.0.1-beta.2",
          patch: "1.0.1-beta.2"
        },
        next: {
          major: "1.0.1-rc.1",
          minor: "1.0.1-rc.1",
          patch: "1.0.1-rc.1"
        }
      }
    },
    {
      currentVersion: "1.0.1-rc.1",
      branches: {
        main: {
          major: "1.0.1",
          minor: "1.0.1",
          patch: "1.0.1"
        },
        alpha: {
          major: "1.0.1-alpha.1",
          minor: "1.0.1-alpha.1",
          patch: "1.0.1-alpha.1"
        },
        beta: {
          major: "1.0.1-beta.1",
          minor: "1.0.1-beta.1",
          patch: "1.0.1-beta.1"
        },
        next: {
          major: "1.0.1-rc.2",
          minor: "1.0.1-rc.2",
          patch: "1.0.1-rc.2"
        }
      }
    },
    {
      currentVersion: "1.0.1",
      branches: {
        main: {
          major: "2.0.0",
          minor: "1.1.0",
          patch: "1.0.2"
        },
        alpha: {
          major: "2.0.0-alpha.1",
          minor: "1.1.0-alpha.1",
          patch: "1.0.2-alpha.1"
        },
        beta: {
          major: "2.0.0-beta.1",
          minor: "1.1.0-beta.1",
          patch: "1.0.2-beta.1"
        },
        next: {
          major: "2.0.0-rc.1",
          minor: "1.1.0-rc.1",
          patch: "1.0.2-rc.1"
        }
      }
    },
    {
      currentVersion: "1.1.0-alpha.1",
      branches: {
        main: {
          major: "1.1.0",
          minor: "1.1.0",
          patch: "1.1.0"
        },
        alpha: {
          major: "1.1.0-alpha.2",
          minor: "1.1.0-alpha.2",
          patch: "1.1.0-alpha.2"
        },
        beta: {
          major: "1.1.0-beta.1",
          minor: "1.1.0-beta.1",
          patch: "1.1.0-beta.1"
        },
        next: {
          major: "1.1.0-rc.1",
          minor: "1.1.0-rc.1",
          patch: "1.1.0-rc.1"
        }
      }
    },
    {
      currentVersion: "1.1.0-beta.1",
      branches: {
        main: {
          major: "1.1.0",
          minor: "1.1.0",
          patch: "1.1.0"
        },
        alpha: {
          major: "1.1.0-alpha.1",
          minor: "1.1.0-alpha.1",
          patch: "1.1.0-alpha.1"
        },
        beta: {
          major: "1.1.0-beta.2",
          minor: "1.1.0-beta.2",
          patch: "1.1.0-beta.2"
        },
        next: {
          major: "1.1.0-rc.1",
          minor: "1.1.0-rc.1",
          patch: "1.1.0-rc.1"
        }
      }
    },
    {
      currentVersion: "1.1.0-rc.1",
      branches: {
        main: {
          major: "1.1.0",
          minor: "1.1.0",
          patch: "1.1.0"
        },
        alpha: {
          major: "1.1.0-alpha.1",
          minor: "1.1.0-alpha.1",
          patch: "1.1.0-alpha.1"
        },
        beta: {
          major: "1.1.0-beta.1",
          minor: "1.1.0-beta.1",
          patch: "1.1.0-beta.1"
        },
        next: {
          major: "1.1.0-rc.2",
          minor: "1.1.0-rc.2",
          patch: "1.1.0-rc.2"
        }
      }
    },
    {
      currentVersion: "1.1.0",
      branches: {
        main: {
          major: "2.0.0",
          minor: "1.2.0",
          patch: "1.1.1"
        },
        alpha: {
          major: "2.0.0-alpha.1",
          minor: "1.2.0-alpha.1",
          patch: "1.1.1-alpha.1"
        },
        beta: {
          major: "2.0.0-beta.1",
          minor: "1.2.0-beta.1",
          patch: "1.1.1-beta.1"
        },
        next: {
          major: "2.0.0-rc.1",
          minor: "1.2.0-rc.1",
          patch: "1.1.1-rc.1"
        }
      }
    }
  ];

  beforeEach(() => {
    vi.spyOn(setLoggerModule, "setLogger").mockReturnValue(mockedLogger);
    vi.mock("../../src/release/increment-version.js", () => ({
      incrementVersion: vi.fn()
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should not call `incrementVersion()` if the package cannot publish from the branch", () => {
    setNextRelease("major", mockedContextWithInelegibleBranch);
    expect(incrementVersion).not.toHaveBeenCalled();
  });
  it("should not call `incrementVersion()` if the `releaseType` argument is set to `null`", () => {
    setNextRelease(null, { ...mockedContext, lastRelease: { gitTag: null, version: "0.0.0" } });
    expect(incrementVersion).not.toHaveBeenCalled();
    expect(mockedLogger.logInfo).toHaveBeenCalledWith(
      "There are no relevant changes; therefore, no new version is released."
    );
  });
  it("should log a warning message if no last release is found", () => {
    setNextRelease("major", { ...mockedContext, branch: "main" });
    expect(mockedLogger.logWarn).toHaveBeenCalledWith(
      "No last release found; therefore, a new version will not be published."
    );
  });
  describe.each(mockedReleases)(
    "add release to context from $currentVersion",
    ({ currentVersion, branches }) => {
      for (const key in branches) {
        const branch = branches[key];
        const mockedBranchConfig = mockedConfig.releaseType[key];
        if (branch && mockedBranchConfig) {
          describe(`for branch ${key}`, () => {
            for (const releaseType in branch) {
              const expectedVersion = branch[releaseType];
              if (mockedReleaseTypes.includes(releaseType) && expectedVersion) {
                it(`should add the next release to the context with \`gitTag\` set to "v${expectedVersion}" and \`version\` set to "${expectedVersion}" when release type is "${releaseType}"`, () => {
                  const lastRelease = {
                    gitTag: currentVersion === "0.0.0" ? null : `v${currentVersion}`,
                    version: currentVersion
                  };
                  const expectedNextRelease: NextRelease = {
                    gitTag: `v${expectedVersion}`,
                    version: expectedVersion
                  };
                  const context = { ...mockedContext, branch: key, lastRelease };
                  const expectedContext = { ...context, nextRelease: expectedNextRelease };
                  const expectedPreviousReleaseInfoMessage = lastRelease.gitTag
                    ? `The previous release is ${lastRelease.version}`
                    : "There is no previous release";
                  vi.spyOn(incrementVersionModule, "incrementVersion").mockReturnValue(
                    expectedVersion
                  );
                  setNextRelease(releaseType as ReleaseType, context);
                  assert.deepEqual(context, expectedContext);
                  expect(mockedLogger.logInfo).toHaveBeenCalledWith(
                    `${expectedPreviousReleaseInfoMessage} and the next release version is ${expectedVersion}.`
                  );
                });
              }
            }
          });
        }
      }
    }
  );
});
