import { execSync } from "node:child_process";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import getBranchName from "../../src/git/get-branch-name.js";

describe("get branch name", () => {
  const logger = {
    logDebug: vi.fn(),
    logInfo: vi.fn(),
    logError: vi.fn(),
    logWarn: vi.fn(),
    logSuccess: vi.fn()
  };
  const gitRevParseCommand = "git rev-parse --abbrev-ref HEAD";
  const gitShowCommand = "git show -s --pretty=%d HEAD";
  const mockExecSync = execSync as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.mock("node:child_process", () => ({ execSync: vi.fn() }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return the value of `HEAD` ref when this is not `"HEAD"`', () => {
    mockExecSync.mockImplementation(gitCommand =>
      gitCommand === gitRevParseCommand ? "main" : ""
    );
    expect(getBranchName(logger)).toBe("main");
    expect(execSync).toHaveBeenCalledTimes(1);
    expect(execSync).toHaveBeenCalledWith(gitRevParseCommand, {
      encoding: "utf8"
    });
    expect(execSync).not.toHaveBeenCalledWith(gitShowCommand, {
      encoding: "utf8"
    });
  });
  it('should return the remote branch name if `HEAD` ref returns `"HEAD"', () => {
    mockExecSync.mockImplementation(gitCommand => {
      return gitCommand === gitRevParseCommand
        ? "HEAD"
        : gitCommand === gitShowCommand
          ? "(HEAD -> main, origin/main)"
          : "";
    });
    expect(getBranchName(logger)).toBe("main");
    expect(execSync).toHaveBeenCalledTimes(2);
    expect(execSync).toHaveBeenCalledWith(gitRevParseCommand, {
      encoding: "utf8"
    });
    expect(execSync).toHaveBeenCalledWith(gitShowCommand, {
      encoding: "utf8"
    });
  });
});
