import { setLogger } from "@release-change/logger";
import { runCommand } from "@release-change/shared";
import { afterEach, assert, beforeEach, expect, it, vi } from "vitest";

import { checkRepository } from "../src/index.js";
import { mockedContext } from "./fixtures/mocked-context.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

beforeEach(() => {
  vi.spyOn({ setLogger }, "setLogger").mockReturnValue(mockedLogger);
  vi.mock("@release-change/shared", () => ({ runCommand: vi.fn() }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if the Git command fails", async () => {
  const mockedError = new Error("Error");
  const mockedProcessExit = vi.spyOn(process, "exit").mockImplementation(code => {
    throw new Error(`process.exit(${code})`);
  });
  vi.mocked(runCommand).mockRejectedValue(mockedError);
  process.exitCode = 128;
  await expect(checkRepository(mockedContext, mockedLogger)).rejects.toThrow("process.exit(128)");
  expect(mockedLogger.logError).toHaveBeenCalledWith("Error");
  expect(mockedProcessExit).toHaveBeenCalledWith(128);
  assert.deepNestedInclude(mockedContext.errors, mockedError);
});
it("should call `process.exit(128)` if this is not a Git repository", async () => {
  vi.spyOn(process, "exit").mockImplementation(code => {
    throw new Error(`process.exit(${code})`);
  });
  vi.mocked(runCommand).mockReturnValue(
    Promise.resolve({
      status: 128,
      stdout: "",
      stderr: "Error"
    })
  );
  process.exitCode = 128;
  await expect(checkRepository(mockedContext, mockedLogger)).rejects.toThrow("process.exit(128)");
  expect(mockedLogger.logError).toHaveBeenCalledWith(
    "The current directory is not a Git repository."
  );
  expect(process.exit).toHaveBeenCalledWith(128);
});
it("should not call `process.exit()` if this is a Git repository", async () => {
  vi.mocked(runCommand).mockReturnValue(
    Promise.resolve({
      status: 0,
      stdout: "",
      stderr: ""
    })
  );
  await checkRepository(mockedContext, mockedLogger);
  expect(process.exit).not.toHaveBeenCalled();
});
it("should return 0 if this is a Git repository", async () => {
  vi.mocked(runCommand).mockReturnValue(
    Promise.resolve({
      status: 0,
      stdout: "",
      stderr: ""
    })
  );
  process.exitCode = 0;
  expect(await checkRepository(mockedContext, mockedLogger)).toBe(0);
  expect(runCommand).toHaveBeenCalledWith("git", ["rev-parse", "--git-dir"], { cwd: mockedCwd });
});
