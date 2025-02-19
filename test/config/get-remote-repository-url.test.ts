import { execSync } from "node:child_process";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getRemoteRepositoryUrl } from "../../src/config/get-remote-repository-url.js";
import * as isGitRepositoryModule from "../../src/git/is-git-repository.js";

describe("get remote repository URL", () => {
  const mockedRemote = [
    "origin\tgit@github.com:release-change/release-change.git (fetch)",
    "origin\tgit@github.com:release-change/release-change.git (push)"
  ];
  const mockExecSync = execSync as ReturnType<typeof vi.fn>;
  const expectedMockedRemoteUrl = "git@github.com:release-change/release-change.git";

  beforeEach(() => {
    vi.mock("../../src/git/is-git-repository.js");
    vi.mock("node:child_process", () => ({ execSync: vi.fn() }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return `null` when the project is not a Git repository", async () => {
    vi.mocked(isGitRepositoryModule.isGitRepository).mockReturnValue(Promise.resolve(false));
    expect(await getRemoteRepositoryUrl()).toBe(null);
  });
  it("should return `null` when no remote URL is defined", async () => {
    vi.mocked(isGitRepositoryModule.isGitRepository).mockReturnValue(Promise.resolve(true));
    mockExecSync.mockReturnValue("");
    expect(await getRemoteRepositoryUrl()).toBe(null);
  });
  it("should return `null` when no remote URL for push is defined", async () => {
    vi.mocked(isGitRepositoryModule.isGitRepository).mockReturnValue(Promise.resolve(true));
    mockExecSync.mockReturnValue(mockedRemote[0]);
    expect(await getRemoteRepositoryUrl()).toBe(null);
  });
  it("should return the first remote URL for push found", async () => {
    vi.mocked(isGitRepositoryModule.isGitRepository).mockReturnValue(Promise.resolve(true));
    mockExecSync.mockReturnValue(mockedRemote.join("\n"));
    expect(await getRemoteRepositoryUrl()).toBe(expectedMockedRemoteUrl);
  });
});
