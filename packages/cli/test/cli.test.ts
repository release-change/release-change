import process from "node:process";

import { WORKSPACE_NAME } from "@release-change/shared";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { cli } from "../src/cli.js";
import { run } from "../src/run.js";

const cliOptions = ["-h", "--help", "-v", "--version"];

beforeEach(() => {
  vi.mock("../src/run.js", () => ({
    run: vi.fn()
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

describe.each(["npm", "pnpm"])("for %s", packageManager => {
  it.each(cliOptions)("should not call `run()` when `%s` is used", async cliOption => {
    vi.spyOn(process, "argv", "get").mockReturnValue([packageManager, WORKSPACE_NAME, cliOption]);
    await cli();
    expect(run).not.toHaveBeenCalled();
  });
});
