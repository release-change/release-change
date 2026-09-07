import type { BranchConfig } from "@release-change/shared";

import { describe, expect, it } from "vitest";

import { incrementVersion } from "../src/increment-version.js";
import { mockedReleases } from "./fixtures/mocked-releases.js";

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
  expect(() => incrementVersion("0.0.0", null, {})).toThrow(
    new Error("Failed to increment version from 0.0.0: No release type retrieved.", {
      cause: {
        title: "Failed to increment version from 0.0.0",
        message: "No release type retrieved.",
        details: {
          output: "releaseType: null"
        }
      }
    })
  );
});
it("should throw an error if the current version is invalid", () => {
  expect(() => incrementVersion("0", "patch", {})).toThrow(
    new Error("Failed to increment version from 0: No next version given.", {
      cause: {
        title: "Failed to increment version from 0",
        message: "No next version given.",
        details: {
          output: "nextVersion: null"
        }
      }
    })
  );
});
describe.each(mockedReleases)(
  "increment version from $currentVersion",
  ({ currentVersion, branches }) => {
    describe.each(branches)("for branch $branch", ({ branch, releaseTypes }) => {
      const mockedBranchConfig = mockedBranchConfigs[branch];
      if (mockedBranchConfig) {
        it.each(releaseTypes)(
          `should return '$expectedVersion' if release type is '$releaseType'`,
          ({ expectedVersion, releaseType }) => {
            expect(incrementVersion(currentVersion, releaseType, mockedBranchConfig)).toBe(
              expectedVersion
            );
          }
        );
      }
    });
  }
);
