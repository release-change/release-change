import type { Context } from "@release-change/shared";

import { parsePathname, runCommand } from "@release-change/shared";
import { afterEach, assert, beforeEach, expect, it, vi } from "vitest";

import { getPullRequestBody } from "../src/get-pull-request-body.js";

const mockedToken = "release-token";
const mockedRepositoryUrl = "https://github.com/user-id/repo-name.git";
const mockedConfig = {
  branches: ["main"],
  releaseType: {
    main: {
      channel: "latest"
    }
  },
  isMonorepo: false,
  debug: false,
  dryRun: false,
  repositoryUrl: mockedRepositoryUrl,
  remoteName: "origin"
};
const mockedContext: Context = {
  cwd: "/fake/path",
  env: {
    RELEASE_TOKEN: mockedToken
  },
  branch: "main",
  ci: {
    isCi: true,
    isPullRequest: false
  },
  packages: [{ name: "", path: "." }],
  config: mockedConfig
};
const mockedPullRequestData = {
  url: "https://api.github.com/repos/user-id/repo-name/pulls/1337",
  id: 1,
  node_id: "MDExOlB1bGxSZXF1ZXN0MQ==",
  html_url: "https://github.com/user-id/repo-name/pull/1337",
  diff_url: "https://github.com/user-id/repo-name/pull/1337.diff",
  patch_url: "https://github.com/user-id/repo-name/pull/1337.patch",
  issue_url: "https://api.github.com/repos/user-id/repo-name/issues/1337",
  commits_url: "https://api.github.com/repos/user-id/repo-name/pulls/1337/commits",
  review_comments_url: "https://api.github.com/repos/user-id/repo-name/pulls/1337/comments",
  review_comment_url: "https://api.github.com/repos/user-id/repo-name/pulls/comments{/number}",
  comments_url: "https://api.github.com/repos/user-id/repo-name/issues/1337/comments",
  number: 1337,
  state: "open",
  locked: true,
  title: "Some new feature",
  body: "Some text explaining the feature.",
  created_at: "2025-01-01T13:37:42Z",
  updated_at: "2025-01-01T13:37:42Z",
  closed_at: "2025-01-01T13:37:42Z",
  merged_at: "2025-01-01T13:37:42Z"
};
const mockedPullRequestDataWithEmptyBody = {
  ...mockedPullRequestData,
  body: ""
};

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({ runCommand: vi.fn(), parsePathname: vi.fn() }));
  vi.mocked(parsePathname).mockReturnValue({
    owner: "user-id",
    repository: "repo-name"
  });
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should return `null` if an error occurs when requesting the URL", async () => {
  vi.mocked(runCommand).mockResolvedValue({
    status: 404,
    stdout: "",
    stderr: "Error"
  });
  expect(await getPullRequestBody(1337, mockedContext)).toBe(null);
});
it("should return `null` if the pull request body is not found", async () => {
  vi.mocked(runCommand).mockResolvedValue({
    status: 0,
    stdout: "{}",
    stderr: ""
  });
  expect(await getPullRequestBody(1337, mockedContext)).toBe(null);
});
it("should return an array of empty strings if the pull request body is empty", async () => {
  vi.mocked(runCommand).mockResolvedValue({
    status: 0,
    stdout: JSON.stringify(mockedPullRequestDataWithEmptyBody),
    stderr: ""
  });
  assert.deepEqual(await getPullRequestBody(1337, mockedContext), [""]);
});
it("should return the pull request body as an array if the pull request body is filled", async () => {
  vi.mocked(runCommand).mockResolvedValue({
    status: 0,
    stdout: JSON.stringify(mockedPullRequestData),
    stderr: ""
  });
  assert.deepEqual(await getPullRequestBody(1337, mockedContext), [mockedPullRequestData.body]);
});
