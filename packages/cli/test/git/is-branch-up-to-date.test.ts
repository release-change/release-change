import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as getRemoteNameModule from "../../src/git/get-remote-name.js";
import { isBranchUpToDate } from "../../src/git/is-branch-up-to-date.js";
import * as runCommandSyncModule from "../../src/shared/run-command-sync.js";

describe("check if the branch is up to date", () => {
  const mockedRemoteName = "origin";
  const mockedBranch = "main";
  const mockedGitRevList = "fake-commit";

  beforeEach(() => {
    vi.mock("../../src/git/get-remote-name.js");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return `false` if no remote name is defined", async () => {
    vi.mocked(getRemoteNameModule.getRemoteName).mockReturnValue(Promise.resolve(null));
    expect(await isBranchUpToDate(mockedBranch)).toBe(false);
  });
  it("should return `false` if `git rev-list` returns a non-empty string", async () => {
    vi.mocked(getRemoteNameModule.getRemoteName).mockReturnValue(Promise.resolve(mockedRemoteName));
    vi.spyOn(runCommandSyncModule, "runCommandSync").mockReturnValue({
      status: 0,
      stdout: mockedGitRevList,
      stderr: ""
    });
    expect(await isBranchUpToDate(mockedBranch)).toBe(false);
  });
  it("should return `true` if `git rev-list` returns an empty string", async () => {
    vi.mocked(getRemoteNameModule.getRemoteName).mockReturnValue(Promise.resolve(mockedRemoteName));
    vi.spyOn(runCommandSyncModule, "runCommandSync").mockReturnValue({
      status: 0,
      stdout: "",
      stderr: ""
    });
    expect(await isBranchUpToDate(mockedBranch)).toBe(true);
  });
});
