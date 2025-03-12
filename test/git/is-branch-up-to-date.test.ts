import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { execSync } from "node:child_process";

import * as getRemoteNameModule from "../../src/git/get-remote-name.js";
import { isBranchUpToDate } from "../../src/git/is-branch-up-to-date.js";

describe("check if the branch is up to date", () => {
  const mockedRemoteName = "origin";
  const mockedBranch = "main";
  const mockedGitRevList = "fake-commit";
  const mockedExecSync = execSync as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.mock("node:child_process", () => ({ execSync: vi.fn() }));
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
    mockedExecSync.mockReturnValue(mockedGitRevList);
    expect(await isBranchUpToDate(mockedBranch)).toBe(false);
  });
  it("should return `true` if `git rev-list` returns an empty string", async () => {
    vi.mocked(getRemoteNameModule.getRemoteName).mockReturnValue(Promise.resolve(mockedRemoteName));
    mockedExecSync.mockReturnValue("");
    expect(await isBranchUpToDate(mockedBranch)).toBe(true);
  });
});
