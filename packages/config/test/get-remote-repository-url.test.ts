import { getTrackedRepositories } from "@release-change/git";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getRemoteRepositoryUrl } from "../src/get-remote-repository-url.js";

describe("get remote repository URL", () => {
  const mockedSshRemoteUrl = "git@github.com:user-id/repo-name.git";
  const mockedHttpsRemoteUrl = "https://github.com/user-id/repo-name.git";
  const mockedRemotes = [
    [
      `origin\t${mockedSshRemoteUrl} (fetch)`,
      `origin\t${mockedSshRemoteUrl} (push)`,
      "ssh://git@github.com/user-id/repo-name.git"
    ],
    [
      `origin\t${mockedHttpsRemoteUrl} (fetch)`,
      `origin\t${mockedHttpsRemoteUrl} (push)`,
      "https://github.com/user-id/repo-name.git"
    ]
  ];

  beforeEach(() => {
    vi.mock("@release-change/git", () => ({ getTrackedRepositories: vi.fn() }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return `null` if the project is not a Git repository", async () => {
    vi.mocked(getTrackedRepositories).mockReturnValue(Promise.resolve(null));
    expect(await getRemoteRepositoryUrl()).toBe(null);
  });
  it("should return `null` when there are no tracked repositories", async () => {
    vi.mocked(getTrackedRepositories).mockReturnValue(Promise.resolve(""));
    expect(await getRemoteRepositoryUrl()).toBe(null);
  });
  it.each(mockedRemotes)(
    'should return `null` when no remote URL for push is defined (only "%s")',
    async mockedRemoteFetch => {
      vi.mocked(getTrackedRepositories).mockReturnValue(Promise.resolve(mockedRemoteFetch));
      expect(await getRemoteRepositoryUrl()).toBe(null);
    }
  );
  it.each(mockedRemotes)(
    'should return the first remote URL for push found ("%s" and "%s")',
    async (mockedRemoteFetch, mockedRemotePush, expectedMockedRemoteUrl) => {
      const mockedRemote = [mockedRemoteFetch, mockedRemotePush];
      vi.mocked(getTrackedRepositories).mockReturnValue(Promise.resolve(mockedRemote.join("\n")));
      expect(await getRemoteRepositoryUrl()).toBe(expectedMockedRemoteUrl);
    }
  );
});
