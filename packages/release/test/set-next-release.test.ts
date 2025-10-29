import type { DetailedError, NextRelease } from "@release-change/shared";

import { addErrorToContext, checkErrorType, setLogger } from "@release-change/logger";
import { afterEach, assert, beforeEach, describe, expect, it, vi } from "vitest";

import { incrementVersion } from "../src/increment-version.js";
import { setNextRelease } from "../src/index.js";
import { mockedConfig } from "./fixtures/mocked-config.js";
import { mockedContext, mockedContextWithIneligibleBranch } from "./fixtures/mocked-context.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedNextReleases } from "./fixtures/mocked-next-releases.js";
import { mockedNextReleasesInMonorepo } from "./fixtures/mocked-next-releases-in-monorepo.js";

beforeEach(() => {
  vi.mock("@release-change/logger", () => ({
    addErrorToContext: vi.fn(),
    checkErrorType: vi.fn(),
    setLogger: vi.fn()
  }));
  vi.mock("../src/increment-version.js", () => ({
    incrementVersion: vi.fn()
  }));
  vi.mocked(addErrorToContext).mockImplementation((error, context) => {
    if (error instanceof Error) {
      const { cause } = error;
      if (
        cause &&
        typeof cause === "object" &&
        "title" in cause &&
        "message" in cause &&
        "details" in cause
      ) {
        context.errors.push(cause as DetailedError);
      }
    }
  });
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if the version increment fails", () => {
  const mockedErrorMessage = "Failed to increment version from 1.0.0: No next version given.";
  const mockedError = new Error(mockedErrorMessage, {
    cause: {
      title: "Failed to increment version from 1.0.0",
      message: "No next version given.",
      details: {
        output: "nextVersion: null"
      }
    }
  });
  const mockedContextWithLastRelease = {
    ...mockedContext,
    lastRelease: {
      ref: "v1.0.0",
      packages: [{ name: "", pathname: ".", gitTag: "v1.0.0", version: "1.0.0" }]
    }
  };
  vi.mocked(incrementVersion).mockImplementation(() => {
    throw mockedError;
  });
  vi.mocked(checkErrorType).mockReturnValue(mockedErrorMessage);
  setNextRelease([{ name: "", releaseType: "major" }], mockedContextWithLastRelease);
  expect(mockedLogger.logError).toHaveBeenCalledWith(mockedErrorMessage);
  assert.deepNestedInclude(mockedContextWithLastRelease.errors, mockedError.cause);
});
it("should not call `incrementVersion()` if the package cannot publish from the branch", () => {
  setNextRelease([{ name: "", releaseType: "major" }], mockedContextWithIneligibleBranch);
  expect(incrementVersion).not.toHaveBeenCalled();
});
it("should not call `incrementVersion()` if the `releaseType` argument is set to `null`", () => {
  setNextRelease([{ name: "", releaseType: null }], {
    ...mockedContext,
    lastRelease: {
      ref: null,
      packages: [{ name: "", pathname: ".", gitTag: null, version: "0.0.0" }]
    }
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
    lastRelease: {
      ref: null,
      packages: [{ name: "@monorepo/a", pathname: "packages/a", gitTag: null, version: "0.0.0" }]
    }
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
          const expectedNextRelease: NextRelease = nextReleases.map(nextRelease => {
            const gitTag = `${nextRelease.name}${nextRelease.name ? "@" : ""}v${nextRelease.version}`;
            return nextRelease.npmTag
              ? {
                  name: nextRelease.name,
                  pathname: nextRelease.pathname,
                  gitTag,
                  version: nextRelease.version,
                  npmTag: nextRelease.npmTag
                }
              : {
                  name: nextRelease.name,
                  pathname: nextRelease.pathname,
                  gitTag,
                  version: nextRelease.version
                };
          });
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
