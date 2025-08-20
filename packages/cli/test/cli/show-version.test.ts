import childProcess from "node:child_process";

import { WORKSPACE_VERSION } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { showVersion } from "../../src/cli/show-version.js";

const expectedVersion = WORKSPACE_VERSION;
const cliOptions = ["-v", "--version"];
let originalConsoleLog: typeof console.log;

beforeEach(() => {
  originalConsoleLog = console.log;
  console.log = vi.fn();
});

afterEach(() => {
  console.log = originalConsoleLog;
  vi.restoreAllMocks();
});

it.each(cliOptions)(
  `should display a message saying \`v${expectedVersion}\` when using the \`%s\` command`,
  cliOption => {
    vi.spyOn(childProcess, "execSync").mockReturnValue(`npx release-change ${cliOption}`);
    showVersion();
    expect(console.log).toHaveBeenCalledWith(`v${expectedVersion}`);
  }
);
