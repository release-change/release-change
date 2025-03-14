import type { Logger } from "../../src/logger/logger.types.js";

import process from "node:process";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { checkRepository } from "../../src/git/check-repository.js";
import * as runCommandModule from "../../src/git/run-command.js";
import * as setLoggerModule from "../../src/logger/set-logger.js";

describe("check repository", () => {
  const mockedLogger: Logger = {
    setDebugScope: vi.fn(),
    logDebug: vi.fn(),
    logInfo: vi.fn(),
    logError: vi.fn(),
    logWarn: vi.fn(),
    logSuccess: vi.fn()
  };
  let originalProcessExit: typeof process.exit;

  beforeEach(() => {
    vi.spyOn(setLoggerModule, "setLogger").mockReturnValue(mockedLogger);
    vi.mock("../../src/git/run-command.js");
    originalProcessExit = process.exit;
    Object.defineProperty(process, "exit", {
      value: vi.fn(),
      configurable: true,
      writable: true
    });
  });

  afterEach(() => {
    process.exit = originalProcessExit;
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it("should call `process.exit(128)` if this is not a Git repository", async () => {
    vi.mocked(runCommandModule.runCommand).mockReturnValue(
      Promise.resolve({
        status: 128,
        stdout: "",
        stderr: "Error"
      })
    );
    await checkRepository(mockedLogger);
    expect(process.exit).toHaveBeenCalledWith(128);
  });
  it("should not call `process.exit()` if this is a Git repository", async () => {
    vi.mocked(runCommandModule.runCommand).mockReturnValue(
      Promise.resolve({
        status: 0,
        stdout: "",
        stderr: ""
      })
    );
    await checkRepository(mockedLogger);
    expect(process.exit).not.toHaveBeenCalled();
  });
  it("should return 0 if this is a Git repository", async () => {
    vi.stubGlobal("process", { exitCode: 0 });
    vi.mocked(runCommandModule.runCommand).mockReturnValue(
      Promise.resolve({
        status: 0,
        stdout: "",
        stderr: ""
      })
    );
    expect(await checkRepository(mockedLogger)).toBe(0);
    vi.unstubAllGlobals();
  });
});
