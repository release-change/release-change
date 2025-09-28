import type { BranchConfig, ReleaseType } from "@release-change/shared";

import { describe, expect, it } from "vitest";

import { mockedReleases } from "../../cli/test/fixtures/mocked-releases.js";
import { incrementVersion } from "../src/increment-version.js";

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

it("should throw an error if the release type is set to `null`", () => {
  expect(() => incrementVersion("0.0.0", null, {})).toThrowError();
});
it("should throw an error if the current version is invalid", () => {
  expect(() => incrementVersion("0", "patch", {})).toThrowError();
});

describe.each(mockedReleases)(
  "increment version from $currentVersion",
  ({ currentVersion, branches }) => {
    for (const key in branches) {
      const branch = branches[key];
      const mockedBranchConfig = mockedBranchConfigs[key];
      if (branch && mockedBranchConfig) {
        for (const releaseType in branch) {
          const expectedVersion = branch[releaseType];
          it.runIf(mockedReleaseTypes.includes(releaseType))(
            `should return '${expectedVersion}' if release type is '${releaseType}' for branch ${key}`,
            () => {
              expect(
                incrementVersion(currentVersion, releaseType as ReleaseType, mockedBranchConfig)
              ).toBe(expectedVersion);
            }
          );
        }
      }
    }
  }
);
