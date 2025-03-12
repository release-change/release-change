import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getTrackedRepositories } from "../../src/git/get-tracked-repositories.js";
import * as isGitRepositoryModule from "../../src/git/is-git-repository.js";
import * as runCommandSyncModule from "../../src/git/run-command-sync.js";

describe("get tracked repositories", () => {
  const mockedRemote = [
    "origin\tgit@github.com:release-change/release-change.git (fetch)",
    "origin\tgit@github.com:release-change/release-change.git (push)"
  ];

  beforeEach(() => {
    vi.mock("../../src/git/is-git-repository.js");
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
    vi.spyOn(runCommandSyncModule, "runCommandSync").mockReturnValue({
      status: 0,
      stdout: mockedRemote.join("\n"),
      stderr: ""
    });
    expect(await getTrackedRepositories()).toBe(mockedRemote.join("\n"));
  });
});
