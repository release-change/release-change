import { runCommandSync } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { getTrackedRepositories } from "../src/index.js";
import * as isGitRepositoryModule from "../src/is-git-repository.js";

const mockedRemote = [
  "origin\tgit@github.com:release-change/release-change.git (fetch)",
  "origin\tgit@github.com:release-change/release-change.git (push)"
];

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({
    runCommandSync: vi.fn(),
    WORKSPACE_NAME: "release-change"
  }));
  vi.mock("../src/is-git-repository.js");
});

afterEach(() => {
  vi.clearAllMocks();
});

it("should return `null` when the project is not a Git repository", async () => {
  vi.mocked(isGitRepositoryModule.isGitRepository).mockReturnValue(Promise.resolve(false));
  expect(await getTrackedRepositories()).toBe(null);
});
it("should return the value of `git remote -v` if the project is a Git repository", async () => {
  vi.mocked(isGitRepositoryModule.isGitRepository).mockReturnValue(Promise.resolve(true));
  vi.mocked(runCommandSync).mockReturnValue({
    status: 0,
    stdout: mockedRemote.join("\n"),
    stderr: ""
  });
  expect(await getTrackedRepositories()).toBe(mockedRemote.join("\n"));
});
