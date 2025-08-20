import process from "node:process";

import { WORKSPACE_NAME } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { cli } from "../../src/cli/cli.js";
import { run } from "../../src/cli/run.js";

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
