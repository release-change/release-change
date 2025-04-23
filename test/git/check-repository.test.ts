import type { Logger } from "../../src/logger/logger.types.js";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { checkRepository } from "../../src/git/check-repository.js";
import * as setLoggerModule from "../../src/logger/set-logger.js";
import * as runCommandModule from "../../src/shared/run-command.js";

describe("check repository", () => {
  const mockedLogger: Logger = {
    setDebugScope: vi.fn(),
    logDebug: vi.fn(),
    logInfo: vi.fn(),
    logError: vi.fn(),
    logWarn: vi.fn(),
    logSuccess: vi.fn()
  };

  beforeEach(() => {
    vi.spyOn(setLoggerModule, "setLogger").mockReturnValue(mockedLogger);
    vi.mock("../../src/shared/run-command.js");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call `process.exit(128)` if this is not a Git repository", async () => {
    vi.spyOn(process, "exit").mockImplementation(code => {
      throw new Error(`process.exit(${code})`);
    });
    vi.mocked(runCommandModule.runCommand).mockReturnValue(
      Promise.resolve({
        status: 128,
        stdout: "",
        stderr: "Error"
      })
    );
    process.exitCode = 128;
    await expect(checkRepository(mockedLogger)).rejects.toThrow();
    expect(mockedLogger.logError).toHaveBeenCalledWith(
      "The current directory is not a Git repository."
    );
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
    vi.mocked(runCommandModule.runCommand).mockReturnValue(
      Promise.resolve({
        status: 0,
        stdout: "",
        stderr: ""
      })
    );
    process.exitCode = 0;
    expect(await checkRepository(mockedLogger)).toBe(0);
  });
});
