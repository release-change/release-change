import type { Context } from "@release-change/shared";

import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { getAllTags, getLatestValidTag } from "../src/index.js";
import { mockedRepositoryUrl } from "./fixtures/mocked-repository-url.js";

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
};
const mockedInvalidConfig = {
  branches: mockedConfig.branches,
  releaseType: {},
  debug: mockedConfig.debug,
  dryRun: mockedConfig.dryRun,
  repositoryUrl: mockedConfig.repositoryUrl,
  remoteName: mockedConfig.remoteName
};
const mockedContext = {
  cwd: "/fake/path",
  env: {},
  config: mockedConfig,
  ci: {
    isCi: true,
    isPullRequest: false
  },
  branch: "main"
} as Context;
const mockedContextWithInvalidConfig = {
  cwd: mockedContext.cwd,
  env: {},
  config: mockedInvalidConfig,
  branch: "main"
} as Context;
const mockedValidGitTags = [
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
const mockedInvalidGitTags = [
  "v2",
  "v2-rc.2",
  "v2-rc.1",
  "v2-beta.3",
  "v2-beta.2",
  "v2-beta.1",
  "v2-alpha.4",
  "v2-alpha.3",
  "v2-alpha.2",
  "v2-alpha.1",
  "v1.1",
  "v1",
  "v0.2",
  "v0.1"
];
const mockedContexts = [
  {
    branch: "main",
    gitTag: "v2.0.0"
  },
  {
    branch: "next",
    gitTag: "v2.0.0-rc.2"
  },
  {
    branch: "beta",
    gitTag: "v2.0.0-beta.3"
  },
  {
    branch: "alpha",
    gitTag: "v2.0.0-alpha.4"
  }
];

beforeEach(() => {
  vi.mock("../src/get-all-tags.js", () => ({
    getAllTags: vi.fn()
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error message when the branch is unknown", () => {
  vi.mocked(getAllTags).mockReturnValue(mockedValidGitTags);
  expect(() => getLatestValidTag({ ...mockedContext, branch: "" })).toThrowError();
});
it("should throw an error message when the release type is not found for the branch", () => {
  vi.mocked(getAllTags).mockReturnValue(mockedValidGitTags);
  expect(() => getLatestValidTag(mockedContextWithInvalidConfig)).toThrowError();
});
it("should return `null` if no valid Git tag is available", () => {
  vi.mocked(getAllTags).mockReturnValue(mockedInvalidGitTags);
  expect(getLatestValidTag(mockedContext)).toBe(null);
});
it.each(mockedContexts)(
  "should return the first relevant Git tag for branch $branch",
  ({ branch, gitTag }) => {
    const context = { ...mockedContext, branch };
    vi.mocked(getAllTags).mockReturnValue(mockedValidGitTags);
    expect(getLatestValidTag(context)).toBe(gitTag);
  }
);
