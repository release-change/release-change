import { runCommandSync } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { getRemoteName } from "../src/index.js";
import { isBranchUpToDate } from "../src/is-branch-up-to-date.js";

const mockedRemoteName = "origin";
const mockedBranch = "main";
const mockedGitRevList = "fake-commit";

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({ runCommandSync: vi.fn() }));
  vi.mock("../src/get-remote-name.js", () => ({
    getRemoteName: vi.fn()
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should return `false` if no remote name is defined", async () => {
  vi.mocked(getRemoteName).mockReturnValue(Promise.resolve(null));
  expect(await isBranchUpToDate(mockedBranch)).toBe(false);
});
it("should return `false` if `git rev-list` returns a non-empty string", async () => {
  vi.mocked(getRemoteName).mockReturnValue(Promise.resolve(mockedRemoteName));
  vi.mocked(runCommandSync).mockReturnValue({
    status: 0,
    stdout: mockedGitRevList,
    stderr: ""
  });
  expect(await isBranchUpToDate(mockedBranch)).toBe(false);
});
it("should return `true` if `git rev-list` returns an empty string", async () => {
  vi.mocked(getRemoteName).mockReturnValue(Promise.resolve(mockedRemoteName));
  vi.mocked(runCommandSync).mockReturnValue({
    status: 0,
    stdout: "",
    stderr: ""
  });
  expect(await isBranchUpToDate(mockedBranch)).toBe(true);
});
