import { runCommandSync } from "@release-change/shared";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as getRemoteNameModule from "../src/get-remote-name.js";
import { isBranchUpToDate } from "../src/is-branch-up-to-date.js";

describe("check if the branch is up to date", () => {
  const mockedRemoteName = "origin";
  const mockedBranch = "main";
  const mockedGitRevList = "fake-commit";

  beforeEach(() => {
    vi.mock("../src/get-remote-name.js");
    vi.mock("@release-change/shared", () => ({ runCommandSync: vi.fn() }));
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
    vi.mocked(runCommandSync).mockReturnValue({
      status: 0,
      stdout: mockedGitRevList,
      stderr: ""
    });
    expect(await isBranchUpToDate(mockedBranch)).toBe(false);
  });
  it("should return `true` if `git rev-list` returns an empty string", async () => {
    vi.mocked(getRemoteNameModule.getRemoteName).mockReturnValue(Promise.resolve(mockedRemoteName));
    vi.mocked(runCommandSync).mockReturnValue({
      status: 0,
      stdout: "",
      stderr: ""
    });
    expect(await isBranchUpToDate(mockedBranch)).toBe(true);
  });
});
