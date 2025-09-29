import { runCommand } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { isGitRepository } from "../src/is-git-repository.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({ runCommand: vi.fn() }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should return `false` if it is not a Git repository", async () => {
  vi.mocked(runCommand).mockReturnValue(
    Promise.resolve({
      status: 1,
      stdout: "",
      stderr: "Error"
    })
  );
  expect(await isGitRepository(mockedCwd, mockedLogger)).toBe(false);
  expect(runCommand).toHaveBeenCalledWith("git", ["rev-parse", "--git-dir"], { cwd: mockedCwd });
});
it("should return `true` if it is a Git repository", async () => {
  vi.mocked(runCommand).mockReturnValue(
    Promise.resolve({
      status: 0,
      stdout: "",
      stderr: ""
    })
  );
  expect(await isGitRepository(mockedCwd, mockedLogger)).toBe(true);
  expect(runCommand).toHaveBeenCalledWith("git", ["rev-parse", "--git-dir"], { cwd: mockedCwd });
});
