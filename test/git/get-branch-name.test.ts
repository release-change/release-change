import { describe, expect, it, vi } from "vitest";

import { getBranchName } from "../../src/git/get-branch-name.js";
import * as runCommandSyncModule from "../../src/git/run-command-sync.js";

describe("get branch name", () => {
  const logger = {
    logDebug: vi.fn(),
    logInfo: vi.fn(),
    logError: vi.fn(),
    logWarn: vi.fn(),
    logSuccess: vi.fn()
  };
  const gitRevParseCommandArgs = ["rev-parse", "--abbrev-ref", "HEAD"];
  const gitShowCommandArgs = ["show", "-s", "--pretty=%d", "HEAD"];

  it('should return the value of `HEAD` ref when this is not `"HEAD"`', () => {
    vi.spyOn(runCommandSyncModule, "runCommandSync").mockImplementation(gitCommandArgs =>
      JSON.stringify(gitCommandArgs) === JSON.stringify(gitRevParseCommandArgs)
        ? { status: 0, stdout: "main", stderr: "" }
        : { status: 1, stdout: "", stderr: "Error" }
    );
    expect(getBranchName(logger)).toBe("main");
    expect(runCommandSyncModule.runCommandSync).toHaveBeenCalledTimes(1);
    expect(runCommandSyncModule.runCommandSync).toHaveBeenCalledWith(gitRevParseCommandArgs, {
      encoding: "utf8"
    });
    expect(runCommandSyncModule.runCommandSync).not.toHaveBeenCalledWith(gitShowCommandArgs, {
      encoding: "utf8"
    });
  });
  it('should return the remote branch name if `HEAD` ref returns `"HEAD"', () => {
    vi.spyOn(runCommandSyncModule, "runCommandSync").mockImplementation(gitCommandArgs => {
      return JSON.stringify(gitCommandArgs) === JSON.stringify(gitRevParseCommandArgs)
        ? { status: 0, stdout: "HEAD", stderr: "" }
        : JSON.stringify(gitCommandArgs) === JSON.stringify(gitShowCommandArgs)
          ? { status: 0, stdout: "(HEAD -> main, origin/main)", stderr: "" }
          : { status: 1, stdout: "", stderr: "Error" };
    });
    expect(getBranchName(logger)).toBe("main");
    expect(runCommandSyncModule.runCommandSync).toHaveBeenCalledTimes(2);
    expect(runCommandSyncModule.runCommandSync).toHaveBeenCalledWith(gitRevParseCommandArgs, {
      encoding: "utf8"
    });
    expect(runCommandSyncModule.runCommandSync).toHaveBeenCalledWith(gitShowCommandArgs, {
      encoding: "utf8"
    });
  });
});
