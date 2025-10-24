import { getPackageVersion } from "@release-change/get-packages";
import { getAllTags, getLatestValidTag } from "@release-change/git";
import { checkErrorType, setLogger } from "@release-change/logger";
import { validate } from "@release-change/semver";
import { afterEach, assert, beforeEach, expect, it, vi } from "vitest";

import { getVersionFromTag } from "../src/get-version-from-tag.js";
import { setLastRelease } from "../src/index.js";
import { mockedContext, mockedContextWithIneligibleBranch } from "./fixtures/mocked-context.js";
import { mockedGitTags } from "./fixtures/mocked-git-tags.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedPackages } from "./fixtures/mocked-packages.js";

beforeEach(() => {
  vi.mock("@release-change/logger", () => ({
    checkErrorType: vi.fn(),
    setLogger: vi.fn()
  }));
  vi.mock("@release-change/git", () => ({
    getAllTags: vi.fn(),
    getLatestValidTag: vi.fn()
  }));
  vi.mock("@release-change/semver", () => ({
    validate: vi.fn()
  }));
  vi.mock("@release-change/get-packages", () => ({
    getPackageVersion: vi.fn()
  }));
  vi.mock("../src/get-version-from-tag.js", () => ({
    getVersionFromTag: vi.fn()
  }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
  vi.mocked(validate).mockImplementation(version => version as string);
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if the latest valid tag cannot be performed", () => {
  const mockedErrorMessage = "Failed to get the latest valid tag.";
  const mockedError = new Error(mockedErrorMessage);
  vi.mocked(getLatestValidTag).mockImplementation(() => {
    throw mockedError;
  });
  vi.mocked(checkErrorType).mockReturnValue(mockedErrorMessage);
  setLastRelease(mockedContext);
  expect(mockedLogger.logError).toHaveBeenCalledWith(mockedErrorMessage);
  assert.deepNestedInclude(mockedContext.errors, mockedError);
});
it("should throw an error if the version cannot be performed from tag", () => {
  const mockedErrorMessage = "Failed to get the version from tag.";
  const mockedError = new Error(mockedErrorMessage);
  vi.mocked(getAllTags).mockReturnValue([]);
  vi.mocked(getLatestValidTag).mockReturnValue("v1.0.0");
  vi.mocked(getVersionFromTag).mockImplementation(() => {
    throw mockedError;
  });
  vi.mocked(checkErrorType).mockReturnValue(mockedErrorMessage);
  setLastRelease(mockedContext);
  expect(mockedLogger.logError).toHaveBeenCalledWith(mockedErrorMessage);
  assert.deepNestedInclude(mockedContext.errors, mockedError);
});
it("should throw an error if the package version cannot be performed", () => {
  const mockedErrorMessage = "Failed to get the package version.";
  const mockedError = new Error(mockedErrorMessage);
  vi.mocked(getLatestValidTag).mockReturnValue(null);
  vi.mocked(getVersionFromTag).mockReturnValue("1.0.0");
  vi.mocked(getPackageVersion).mockImplementation(() => {
    throw mockedError;
  });
  vi.mocked(checkErrorType).mockReturnValue(mockedErrorMessage);
  setLastRelease(mockedContext);
  expect(mockedLogger.logError).toHaveBeenCalledWith(mockedErrorMessage);
  assert.deepNestedInclude(mockedContext.errors, mockedError);
});
it("should not call `getLatestValidTag()` if the package cannot publish from the branch", () => {
  setLastRelease(mockedContextWithIneligibleBranch);
  expect(getLatestValidTag).not.toHaveBeenCalled();
});
it.each(mockedPackages)(
  "should add the last release to the context with `packages` set with the appropriate values and `ref` set to `null` if no Git tags nor package versions are found on branch $branch",
  ({ context, branch, packages, expectedLastReleaseWithoutAnything }) => {
    const mockedContext = { ...context, branch, packages };
    vi.mocked(getAllTags).mockReturnValue([]);
    vi.mocked(getLatestValidTag).mockReturnValue(null);
    vi.mocked(validate).mockReturnValue(null);
    vi.mocked(getPackageVersion).mockReturnValue(null);
    setLastRelease(mockedContext);
    assert.deepEqual(mockedContext.lastRelease, expectedLastReleaseWithoutAnything);
  }
);
it.each(mockedPackages)(
  "should add the last release to the context with `packages` set with the appropriate values and `ref` set to `null` if no Git tags are found on branch $branch, but a package version is found",
  ({ context, branch, packages, packageVersions, expectedLastReleaseWithoutGitTags }) => {
    const mockedContext = { ...context, branch, packages };
    vi.mocked(getAllTags).mockReturnValue([]);
    vi.mocked(getLatestValidTag).mockReturnValue(null);
    vi.mocked(getPackageVersion).mockImplementation(path => {
      const expectedPackage = packageVersions.find(packageItem => packageItem.pathname === path);
      return expectedPackage ? expectedPackage.version : null;
    });
    setLastRelease(mockedContext);
    assert.deepEqual(mockedContext.lastRelease, expectedLastReleaseWithoutGitTags);
  }
);
it.each(mockedPackages)(
  "should add the last release to the context with `ref` set to the Git tag value and `packages` set with the appropriate values if a Git tag is found on branch $branch (and no package versions if no Git tags are found)",
  ({ context, branch, packages, expectedLastRelease }) => {
    const mockedContext = { ...context, branch, packages };
    vi.mocked(getAllTags).mockReturnValue(mockedGitTags);
    vi.mocked(getLatestValidTag).mockImplementation((_context, packageName) => {
      if (typeof packageName === "string") {
        const expectedPackage = expectedLastRelease.packages.find(
          packageItem => packageItem.name === packageName
        );
        return expectedPackage ? expectedPackage.gitTag : null;
      }
      return expectedLastRelease.ref;
    });
    vi.mocked(getVersionFromTag).mockImplementation(tag => {
      return tag.replace(/^(@[^@]+@)?v/, "");
    });
    vi.mocked(getPackageVersion).mockReturnValue(null);
    setLastRelease(mockedContext);
    assert.deepEqual(mockedContext.lastRelease, expectedLastRelease);
  }
);
