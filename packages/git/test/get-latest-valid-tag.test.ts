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
  isMonorepo: false,
  dependencyUpdateMethod: null,
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
  packages: [{ name: "", path: "." }],
  branch: "main"
} as Context;
const mockedContextInMonorepo = {
  ...mockedContext,
  config: { ...mockedConfig, isMonorepo: true }
} as Context;
const mockedContextWithInvalidConfig = {
  cwd: mockedContext.cwd,
  env: {},
  config: mockedInvalidConfig,
  packages: [{ name: "", path: "." }],
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
const mockedValidGitTagsInMonorepo = [
  "@monorepo/a@v2.0.0",
  "@monorepo/b@v2.0.0",
  "@monorepo/a@v2.0.0-rc.2",
  "@monorepo/b@v2.0.0-rc.2",
  "@monorepo/a@v2.0.0-rc.1",
  "@monorepo/b@v2.0.0-rc.1",
  "@monorepo/a@v2.0.0-beta.3",
  "@monorepo/b@v2.0.0-beta.3",
  "@monorepo/a@v2.0.0-beta.2",
  "@monorepo/b@v2.0.0-beta.2",
  "@monorepo/a@v2.0.0-beta.1",
  "@monorepo/b@v2.0.0-beta.1",
  "@monorepo/a@v2.0.0-alpha.4",
  "@monorepo/b@v2.0.0-alpha.4",
  "@monorepo/a@v2.0.0-alpha.3",
  "@monorepo/b@v2.0.0-alpha.3",
  "@monorepo/a@v2.0.0-alpha.2",
  "@monorepo/b@v2.0.0-alpha.2",
  "@monorepo/a@v2.0.0-alpha.1",
  "@monorepo/b@v2.0.0-alpha.1",
  "@monorepo/a@v1.1.0",
  "@monorepo/b@v1.1.0",
  "@monorepo/a@v1.0.1",
  "@monorepo/b@v1.0.1",
  "@monorepo/a@v1.0.0",
  "@monorepo/b@v1.0.0",
  "@monorepo/a@v0.2.0",
  "@monorepo/b@v0.2.0",
  "@monorepo/a@v0.1.0",
  "@monorepo/b@v0.1.0"
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
const mockedContextsInMonorepo = [
  {
    branch: "main",
    gitTag: "@monorepo/a@v2.0.0"
  },
  {
    branch: "next",
    gitTag: "@monorepo/a@v2.0.0-rc.2"
  },
  {
    branch: "beta",
    gitTag: "@monorepo/a@v2.0.0-beta.3"
  },
  {
    branch: "alpha",
    gitTag: "@monorepo/a@v2.0.0-alpha.4"
  }
];
const mockedPackages = [
  { name: "", branch: "main", expectedGitTag: "v2.0.0" },
  { name: "", branch: "next", expectedGitTag: "v2.0.0-rc.2" },
  { name: "", branch: "beta", expectedGitTag: "v2.0.0-beta.3" },
  { name: "", branch: "alpha", expectedGitTag: "v2.0.0-alpha.4" },
  { name: "@monorepo/a", branch: "main", expectedGitTag: "@monorepo/a@v2.0.0" },
  { name: "@monorepo/a", branch: "next", expectedGitTag: "@monorepo/a@v2.0.0-rc.2" },
  { name: "@monorepo/a", branch: "beta", expectedGitTag: "@monorepo/a@v2.0.0-beta.3" },
  { name: "@monorepo/a", branch: "alpha", expectedGitTag: "@monorepo/a@v2.0.0-alpha.4" },
  { name: "@monorepo/b", branch: "main", expectedGitTag: "@monorepo/b@v2.0.0" },
  { name: "@monorepo/b", branch: "next", expectedGitTag: "@monorepo/b@v2.0.0-rc.2" },
  { name: "@monorepo/b", branch: "beta", expectedGitTag: "@monorepo/b@v2.0.0-beta.3" },
  { name: "@monorepo/b", branch: "alpha", expectedGitTag: "@monorepo/b@v2.0.0-alpha.4" },
  { name: "@monorepo/c", branch: "main", expectedGitTag: null },
  { name: "@monorepo/c", branch: "next", expectedGitTag: null },
  { name: "@monorepo/c", branch: "beta", expectedGitTag: null },
  { name: "@monorepo/c", branch: "alpha", expectedGitTag: null }
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
it.each(mockedContextsInMonorepo)(
  "should return the first relevant Git tag for branch $branch in a monorepo",
  ({ branch, gitTag }) => {
    const context = { ...mockedContextInMonorepo, branch };
    vi.mocked(getAllTags).mockReturnValue(mockedValidGitTagsInMonorepo);
    expect(getLatestValidTag(context)).toBe(gitTag);
  }
);
it.each(mockedPackages)(
  "should return $expectedGitTag for package $name and branch $branch in a monorepo",
  ({ name, branch, expectedGitTag }) => {
    const context = { ...mockedContextInMonorepo, branch };
    vi.mocked(getAllTags).mockReturnValue([...mockedValidGitTags, ...mockedValidGitTagsInMonorepo]);
    expect(getLatestValidTag(context, name)).toBe(expectedGitTag);
  }
);
