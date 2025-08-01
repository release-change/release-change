import process from "node:process";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { cli } from "../../src/cli/cli.js";
import { run } from "../../src/cli/run.js";

import { WORKSPACE_NAME } from "../../src/shared/constants.js";

describe("CLI behaviour when running with some CLI options", () => {
  const cliOptions = ["-h", "--help", "-v", "--version"];
  let originalProcessArgv: string[];

  beforeEach(() => {
    originalProcessArgv = process.argv;
    vi.mock("../../src/cli/run.js", () => ({
      run: vi.fn()
    }));
  });
  afterEach(() => {
    process.argv = originalProcessArgv;
    vi.restoreAllMocks();
  });
  it.each(cliOptions)("should not call `run()` when `%s` is used", cliOption => {
    process.argv = ["pnpm", WORKSPACE_NAME, cliOption];
    cli();
    expect(run).not.toHaveBeenCalled();
  });
});
