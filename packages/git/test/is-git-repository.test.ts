import { runCommand } from "@release-change/shared";
import { afterEach, assert, beforeEach, expect, it, vi } from "vitest";

import { isGitRepository } from "../src/is-git-repository.js";
import { mockedContext } from "./fixtures/mocked-context.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({ runCommand: vi.fn() }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if the Git command fails", async () => {
  const mockedProcessExit = vi.spyOn(process, "exit").mockImplementation(code => {
    throw new Error(`process.exit(${code})`);
  });
  const mockedError = new Error("Error");
  vi.mocked(runCommand).mockRejectedValue(mockedError);
  process.exitCode = 128;
  await expect(isGitRepository(mockedContext, mockedLogger)).rejects.toThrow("process.exit(128)");
  expect(mockedLogger.logError).toHaveBeenCalledWith("Error");
  expect(mockedProcessExit).toHaveBeenCalledWith(128);
  assert.deepNestedInclude(mockedContext.errors, mockedError);
});
it("should return `false` if it is not a Git repository", async () => {
  vi.mocked(runCommand).mockReturnValue(
    Promise.resolve({
      status: 1,
      stdout: "",
      stderr: "Error"
    })
  );
  expect(await isGitRepository(mockedContext, mockedLogger)).toBe(false);
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
  expect(await isGitRepository(mockedContext, mockedLogger)).toBe(true);
  expect(runCommand).toHaveBeenCalledWith("git", ["rev-parse", "--git-dir"], { cwd: mockedCwd });
});
