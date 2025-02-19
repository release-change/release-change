import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getRemoteRepositoryUrl } from "../../src/config/get-remote-repository-url.js";
import * as getTrackedRepositoriesModule from "../../src/git/get-tracked-repositories.js";

describe("get remote repository URL", () => {
  const mockedRemote = [
    "origin\tgit@github.com:release-change/release-change.git (fetch)",
    "origin\tgit@github.com:release-change/release-change.git (push)"
  ];
  const mockedRemoteWithoutPush = [
    "origin\tgit@github.com:release-change/release-change.git (fetch)"
  ];
  const expectedMockedRemoteUrl = "git@github.com:release-change/release-change.git";

  beforeEach(() => {
    vi.mock("../../src/git/get-tracked-repositories.js");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return `null` if the project is not a Git repository", async () => {
    vi.mocked(getTrackedRepositoriesModule.getTrackedRepositories).mockReturnValue(
      Promise.resolve(null)
    );
    expect(await getRemoteRepositoryUrl()).toBe(null);
  });
  it("should return `null` when there are no tracked repositories", async () => {
    vi.mocked(getTrackedRepositoriesModule.getTrackedRepositories).mockReturnValue(
      Promise.resolve("")
    );
    expect(await getRemoteRepositoryUrl()).toBe(null);
  });
  it("should return `null` when no remote URL for push is defined", async () => {
    vi.mocked(getTrackedRepositoriesModule.getTrackedRepositories).mockReturnValue(
      Promise.resolve(mockedRemoteWithoutPush.join("\n"))
    );
    expect(await getRemoteRepositoryUrl()).toBe(null);
  });
  it("should return the first remote URL for push found", async () => {
    vi.mocked(getTrackedRepositoriesModule.getTrackedRepositories).mockReturnValue(
      Promise.resolve(mockedRemote.join("\n"))
    );
    expect(await getRemoteRepositoryUrl()).toBe(expectedMockedRemoteUrl);
  });
});
