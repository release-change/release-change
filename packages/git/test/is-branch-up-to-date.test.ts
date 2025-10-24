import { runCommandSync } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { getRemoteName } from "../src/index.js";
import { isBranchUpToDate } from "../src/is-branch-up-to-date.js";
import { mockedContext } from "./fixtures/mocked-context.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";

const mockedRemoteName = "origin";
const mockedBranch = "main";

beforeEach(() => {
  vi.mock("../src/get-remote-name.js", () => ({
    getRemoteName: vi.fn()
  }));
  vi.mock("@release-change/shared", () => ({ runCommandSync: vi.fn() }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should return `false` if the branch name is empty", async () => {
  expect(await isBranchUpToDate("", mockedContext)).toBe(false);
});
it("should return `false` if no remote name is defined", async () => {
  vi.mocked(getRemoteName).mockReturnValue(Promise.resolve(null));
  expect(await isBranchUpToDate(mockedBranch, mockedContext)).toBe(false);
});
it("should return `false` if `git rev-list` returns a non-empty string", async () => {
  vi.mocked(getRemoteName).mockReturnValue(Promise.resolve(mockedRemoteName));
  vi.mocked(runCommandSync).mockReturnValue({
    status: 0,
    stdout: "fake-commit",
    stderr: ""
  });
  expect(await isBranchUpToDate(mockedBranch, mockedContext)).toBe(false);
  expect(runCommandSync).toHaveBeenCalledWith("git", ["fetch", mockedRemoteName], {
    cwd: mockedCwd
  });
  expect(runCommandSync).toHaveBeenCalledWith(
    "git",
    ["rev-list", `@{u}..${mockedRemoteName}/${mockedBranch}`],
    { cwd: mockedCwd }
  );
});
it("should return `true` if `git rev-list` returns an empty string", async () => {
  vi.mocked(getRemoteName).mockReturnValue(Promise.resolve(mockedRemoteName));
  vi.mocked(runCommandSync).mockReturnValue({
    status: 0,
    stdout: "",
    stderr: ""
  });
  expect(await isBranchUpToDate(mockedBranch, mockedContext)).toBe(true);
  expect(runCommandSync).toHaveBeenCalledWith("git", ["fetch", mockedRemoteName], {
    cwd: mockedCwd
  });
  expect(runCommandSync).toHaveBeenCalledWith(
    "git",
    ["rev-list", `@{u}..${mockedRemoteName}/${mockedBranch}`],
    { cwd: mockedCwd }
  );
});
