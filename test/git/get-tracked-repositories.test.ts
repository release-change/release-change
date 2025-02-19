import { execSync } from "node:child_process";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getTrackedRepositories } from "../../src/git/get-tracked-repositories.js";
import * as isGitRepositoryModule from "../../src/git/is-git-repository.js";

describe("get tracked repositories", () => {
  const mockedRemote = [
    "origin\tgit@github.com:release-change/release-change.git (fetch)",
    "origin\tgit@github.com:release-change/release-change.git (push)"
  ];
  const mockExecSync = execSync as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.mock("../../src/git/is-git-repository.js");
    vi.mock("node:child_process", () => ({ execSync: vi.fn() }));
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
    mockExecSync.mockReturnValue(mockedRemote.join("\n"));
    expect(await getTrackedRepositories()).toBe(mockedRemote.join("\n"));
  });
});
