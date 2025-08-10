import { runCommandSync } from "@release-change/shared";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getBranchName } from "../src/index.js";

describe("get branch name", () => {
  const logger = {
    setDebugScope: vi.fn(),
    logDebug: vi.fn(),
    logInfo: vi.fn(),
    logError: vi.fn(),
    logWarn: vi.fn(),
    logSuccess: vi.fn()
  };
  const gitRevParseCommandArgs = ["rev-parse", "--abbrev-ref", "HEAD"];
  const gitShowCommandArgs = ["show", "-s", "--pretty=%d", "HEAD"];

  beforeEach(() => {
    vi.mock("@release-change/shared", () => ({
      runCommandSync: vi.fn()
    }));
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return the value of `HEAD` ref when this is not `"HEAD"`', () => {
    vi.mocked(runCommandSync).mockImplementation((_gitCommand, gitCommandArgs) =>
      JSON.stringify(gitCommandArgs) === JSON.stringify(gitRevParseCommandArgs)
        ? { status: 0, stdout: "main", stderr: "" }
        : { status: 1, stdout: "", stderr: "Error" }
    );
    expect(getBranchName(logger)).toBe("main");
    expect(runCommandSync).toHaveBeenCalledTimes(1);
    expect(runCommandSync).toHaveBeenCalledWith("git", gitRevParseCommandArgs);
    expect(runCommandSync).not.toHaveBeenCalledWith("git", gitShowCommandArgs);
  });
  it('should return the remote branch name if `HEAD` ref returns `"HEAD"', () => {
    vi.mocked(runCommandSync).mockImplementation((_gitCommand, gitCommandArgs) => {
      return JSON.stringify(gitCommandArgs) === JSON.stringify(gitRevParseCommandArgs)
        ? { status: 0, stdout: "HEAD", stderr: "" }
        : JSON.stringify(gitCommandArgs) === JSON.stringify(gitShowCommandArgs)
          ? { status: 0, stdout: "(HEAD -> main, origin/main)", stderr: "" }
          : { status: 1, stdout: "", stderr: "Error" };
    });
    expect(getBranchName(logger)).toBe("main");
    expect(runCommandSync).toHaveBeenCalledTimes(2);
    expect(runCommandSync).toHaveBeenCalledWith("git", gitRevParseCommandArgs);
    expect(runCommandSync).toHaveBeenCalledWith("git", gitShowCommandArgs);
  });
});
