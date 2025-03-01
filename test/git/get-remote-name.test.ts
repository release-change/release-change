import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getRemoteName } from "../../src/git/get-remote-name.js";
import * as getTrackedRepositoriesModule from "../../src/git/get-tracked-repositories.js";

describe("get remote name", () => {
  const mockedSshRemoteUrl = "git@github.com:user-id/repo-name.git";
  const mockedHttpsRemoteUrl = "https://github.com/user-id/repo-name.git";
  const mockedRemotes = [
    [`origin\t${mockedSshRemoteUrl} (fetch)\norigin\t${mockedSshRemoteUrl} (push)`, "origin"],
    [`distant\t${mockedHttpsRemoteUrl} (fetch)\ndistant\t${mockedHttpsRemoteUrl} (push)`, "distant"]
  ];
  const mockedRemotesWithNoPush = [
    `origin\t${mockedSshRemoteUrl} (fetch)`,
    `distant\t${mockedHttpsRemoteUrl} (fetch)`
  ];

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
    expect(await getRemoteName()).toBe(null);
  });
  it("should return `null` when there are no tracked repositories", async () => {
    vi.mocked(getTrackedRepositoriesModule.getTrackedRepositories).mockReturnValue(
      Promise.resolve("")
    );
    expect(await getRemoteName()).toBe(null);
  });
  it.each(mockedRemotesWithNoPush)(
    'should return `null` when no remote name for push is defined (only "%s")',
    async mockedRemoteFetch => {
      vi.mocked(getTrackedRepositoriesModule.getTrackedRepositories).mockReturnValue(
        Promise.resolve(mockedRemoteFetch)
      );
      expect(await getRemoteName()).toBe(null);
    }
  );
  it.each(mockedRemotes)(
    'should return the first remote name for push found ("%s"), that is "%s"',
    async (mockedRemote, expectedMockedRemoteName) => {
      vi.mocked(getTrackedRepositoriesModule.getTrackedRepositories).mockReturnValue(
        Promise.resolve(mockedRemote)
      );
      expect(await getRemoteName()).toBe(expectedMockedRemoteName);
    }
  );
});
