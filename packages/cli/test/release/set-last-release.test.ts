import type { LastRelease } from "@release-change/shared";

import { getAllTags, getLatestValidTag } from "@release-change/git";
import { setLogger } from "@release-change/logger";
import { afterEach, assert, beforeEach, expect, it, vi } from "vitest";

import { getRootPackageVersion } from "../../src/release/get-root-package-version.js";
import { setLastRelease } from "../../src/release/set-last-release.js";
import { mockedContext, mockedContextWithIneligibleBranch } from "../fixtures/mocked-context.js";
import { mockedLogger } from "../fixtures/mocked-logger.js";

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
  vi.mock("@release-change/logger", () => ({
    checkErrorType: vi.fn(),
    setLogger: vi.fn()
  }));
  vi.mock("@release-change/git", () => ({
    getAllTags: vi.fn(),
    getLatestValidTag: vi.fn()
  }));
  vi.mock("../../src/release/get-root-package-version.js", () => ({
    getRootPackageVersion: vi.fn()
  }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});

afterEach(() => {
  vi.clearAllMocks();
});

it("should not call `getLatestValidTag()` if the package cannot publish from the branch", () => {
  setLastRelease(mockedContextWithIneligibleBranch);
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
