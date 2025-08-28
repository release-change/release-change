import type { LastRelease } from "@release-change/shared";

import { getAllTags, getLatestValidTag } from "@release-change/git";
import { setLogger } from "@release-change/logger";
import { afterEach, assert, beforeEach, expect, it, vi } from "vitest";

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
const mockedContexts = [
  {
    branch: "main",
    ref: "v2.0.0"
  },
  {
    branch: "next",
    ref: "v2.0.0-rc.2"
  },
  {
    branch: "beta",
    ref: "v2.0.0-beta.3"
  },
  {
    branch: "alpha",
    ref: "v2.0.0-alpha.4"
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
  "should add the last release to the context with `ref` set to the Git tag value if a Git tag is found on branch $branch",
  ({ branch, ref }) => {
    const context = { ...mockedContext, branch };
    const expectedLastRelease: LastRelease = { ref };
    const expectedContext = { ...context, lastRelease: expectedLastRelease };
    vi.mocked(getAllTags).mockReturnValue(mockedGitTags);
    vi.mocked(getLatestValidTag).mockReturnValue(ref);
    setLastRelease(context);
    assert.deepEqual(context, expectedContext);
  }
);
it.each(mockedContexts)(
  "should add the last release to the context with `ref` set to `null` if no Git tags are found on branch $branch, but a package version is found",
  ({ branch }) => {
    const context = { ...mockedContext, branch };
    const expectedLastRelease: LastRelease = { ref: null };
    const expectedContext = {
      ...context,
      lastRelease: expectedLastRelease
    };
    vi.mocked(getAllTags).mockReturnValue([]);
    vi.mocked(getLatestValidTag).mockReturnValue(null);
    setLastRelease(context);
    assert.deepEqual(context, expectedContext);
  }
);
