import type { ReleaseType } from "@release-change/commit-analyser";
import type { NextRelease } from "@release-change/shared";

import { setLogger } from "@release-change/logger";
import { afterEach, assert, beforeEach, describe, expect, it, vi } from "vitest";

import * as incrementVersionModule from "../../src/release/increment-version.js";
import { incrementVersion } from "../../src/release/increment-version.js";
import { setNextRelease } from "../../src/release/set-next-release.js";
import { mockedConfig } from "../fixtures/mocked-config.js";
import { mockedContext, mockedContextWithIneligibleBranch } from "../fixtures/mocked-context.js";
import { mockedLogger } from "../fixtures/mocked-logger.js";
import { mockedReleases } from "../fixtures/mocked-releases.js";

const mockedReleaseTypes = ["major", "minor", "patch"];

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
  setNextRelease("major", mockedContextWithIneligibleBranch);
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
        for (const releaseType in branch) {
          const expectedVersion = branch[releaseType];
          if (mockedReleaseTypes.includes(releaseType) && expectedVersion) {
            it(`should add the next release to the context with \`gitTag\` set to 'v${expectedVersion}' and \`version\` set to '${expectedVersion}' when release type is '${releaseType}' for branch ${key}`, () => {
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
              vi.spyOn(incrementVersionModule, "incrementVersion").mockReturnValue(expectedVersion);
              setNextRelease(releaseType as ReleaseType, context);
              assert.deepEqual(context, expectedContext);
              expect(mockedLogger.logInfo).toHaveBeenCalledWith(
                `${expectedPreviousReleaseInfoMessage} and the next release version is ${expectedVersion}.`
              );
            });
          }
        }
      }
    }
  }
);
