import type { ReleaseType } from "../../src/commit-analyser/commit-analyser.types.js";
import type { BranchConfig } from "../../src/config/config.types.js";

import { describe, expect, it } from "vitest";

import { incrementVersion } from "../../src/release/increment-version.js";

describe("increment version", () => {
  const mockedReleaseTypes = ["major", "minor", "patch"];
  const mockedBranchConfigs: Record<string, BranchConfig> = {
    main: {
      channel: "default"
    },
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
    next: {
      channel: "next",
      prerelease: true,
      prereleaseIdentifier: "rc"
    }
  };
  const mockedVersions: {
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

  it("should throw an error if the release type is set to `null`", () => {
    expect(() => incrementVersion("0.0.0", null, {})).toThrowError();
  });
  it("should throw an error if the current version is invalid", () => {
    expect(() => incrementVersion("0", "patch", {})).toThrowError();
  });

  describe.each(mockedVersions)(
    "increment version from $currentVersion",
    ({ currentVersion, branches }) => {
      for (const key in branches) {
        const branch = branches[key];
        const mockedBranchConfig = mockedBranchConfigs[key];
        if (branch && mockedBranchConfig) {
          describe(`increment version for branch ${key}`, () => {
            for (const releaseType in branch) {
              const expectedVersion = branch[releaseType];
              it.runIf(mockedReleaseTypes.includes(releaseType))(
                `should return \"${expectedVersion}\" if release type is "${releaseType}"`,
                () => {
                  expect(
                    incrementVersion(currentVersion, releaseType as ReleaseType, mockedBranchConfig)
                  ).toBe(expectedVersion);
                }
              );
            }
          });
        }
      }
    }
  );
});
