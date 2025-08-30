import type { NextRelease } from "@release-change/shared";

import { setLogger } from "@release-change/logger";
import { afterEach, assert, beforeEach, describe, expect, it, vi } from "vitest";

import { incrementVersion } from "../../src/release/increment-version.js";
import { setNextRelease } from "../../src/release/set-next-release.js";
import { mockedConfig } from "../fixtures/mocked-config.js";
import { mockedContext, mockedContextWithIneligibleBranch } from "../fixtures/mocked-context.js";
import { mockedLogger } from "../fixtures/mocked-logger.js";
import { mockedNextReleases } from "../fixtures/mocked-next-releases.js";
import { mockedNextReleasesInMonorepo } from "../fixtures/mocked-next-releases-in-monorepo.js";

beforeEach(() => {
  vi.mock("@release-change/logger", () => ({
    checkErrorType: vi.fn(),
    setLogger: vi.fn()
  }));
  vi.mock("../../src/release/increment-version.js", () => ({
    incrementVersion: vi.fn()
  }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});

afterEach(() => {
  vi.clearAllMocks();
});

it("should not call `incrementVersion()` if the package cannot publish from the branch", () => {
  setNextRelease([{ name: "", releaseType: "major" }], mockedContextWithIneligibleBranch);
  expect(incrementVersion).not.toHaveBeenCalled();
});
it("should not call `incrementVersion()` if the `releaseType` argument is set to `null`", () => {
  setNextRelease([{ name: "", releaseType: null }], {
    ...mockedContext,
    lastRelease: { ref: null, packages: [{ name: "", gitTag: null, version: "0.0.0" }] }
  });
  expect(incrementVersion).not.toHaveBeenCalled();
  expect(mockedLogger.logInfo).toHaveBeenCalledWith(
    "There are no relevant changes; therefore, no new version is released."
  );
});
it("should log a warning message if no last release is found", () => {
  setNextRelease([{ name: "", releaseType: "major" }], mockedContext);
  expect(mockedLogger.logWarn).toHaveBeenCalledWith(
    "No last release found; therefore, a new version will not be published."
  );
});
it("should log a warning message if no last release is found concerning the packages", () => {
  setNextRelease([{ name: "", releaseType: "major" }], {
    ...mockedContext,
    lastRelease: { ref: null, packages: [{ name: "@monorepo/a", gitTag: null, version: "0.0.0" }] }
  });
  expect(mockedLogger.logWarn).toHaveBeenCalledWith("No last release found for root package.");
});
describe.each([...mockedNextReleases, ...mockedNextReleasesInMonorepo])(
  "add release to context (ref: $lastRelease.ref)",
  ({ lastRelease, branches }) => {
    describe.each(branches)("for branch $branch", ({ branch, releaseTypes }) => {
      describe.each(releaseTypes)("for $releaseType", ({ releaseType, nextReleases }) => {
        it("should set nextRelease with the appropriate values", () => {
          const context = {
            ...mockedContext,
            config: { ...mockedConfig, isMonorepo: true },
            branch,
            lastRelease
          };
          const expectedNextRelease: NextRelease = nextReleases.map(nextRelease => ({
            name: nextRelease.name,
            gitTag: `${nextRelease.name}${nextRelease.name ? "@" : ""}v${nextRelease.version}`,
            version: nextRelease.version
          }));
          for (const nextRelease of nextReleases) {
            vi.mocked(incrementVersion).mockReturnValueOnce(nextRelease.version);
          }
          setNextRelease(releaseType, context);
          assert.deepEqual(context.nextRelease, expectedNextRelease);
          for (const nextRelease of nextReleases) {
            const { name, version } = nextRelease;
            const packageLastRelease = lastRelease.packages.find(
              packageItem => packageItem.name === name
            );
            const packageName = name ? name : "root";
            if (packageLastRelease) {
              if (packageLastRelease.gitTag) {
                expect(mockedLogger.logInfo).toHaveBeenCalledWith(
                  `For ${packageName} package, the previous release is ${packageLastRelease.version} and the next release version is ${version}.`
                );
              } else {
                expect(mockedLogger.logInfo).toHaveBeenCalledWith(
                  `For ${packageName} package, there is no previous release and the next release version is ${version}.`
                );
              }
            }
          }
        });
      });
    });
  }
);
