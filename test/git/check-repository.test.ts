import process from "node:process";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { checkRepository } from "../../src/git/check-repository.js";
import * as isGitRepositoryModule from "../../src/git/is-git-repository.js";

describe("check repository", () => {
  const mockedLogger = {
    logDebug: vi.fn(),
    logInfo: vi.fn(),
    logError: vi.fn(),
    logWarn: vi.fn(),
    logSuccess: vi.fn()
  };
  let originalProcessExit: typeof process.exit;

  beforeEach(() => {
    vi.mock("../../src/git/is-git-repository.js");
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
  });

  it("should call `process.exit(1)` if this is not a Git repository", async () => {
    vi.mocked(isGitRepositoryModule.isGitRepository).mockReturnValue(Promise.resolve(false));
    await checkRepository(mockedLogger);
    expect(process.exit).toHaveBeenCalledWith(1);
  });
  it("should not call `process.exit()` if this is a Git repository", async () => {
    vi.mocked(isGitRepositoryModule.isGitRepository).mockReturnValue(Promise.resolve(true));
    await checkRepository(mockedLogger);
    expect(process.exit).not.toHaveBeenCalled();
  });
  it("should return 0 if this is a Git repository", async () => {
    vi.stubGlobal("process", { exitCode: 0 });
    vi.mocked(isGitRepositoryModule.isGitRepository).mockReturnValue(Promise.resolve(true));
    expect(await checkRepository(mockedLogger)).toBe(0);
    vi.unstubAllGlobals();
  });
});
