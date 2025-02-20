import childProcess from "node:child_process";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { showHelp } from "../../src/cli/show-help.js";

import { PACKAGE_NAME } from "../../src/shared/constants.js";

describe(`display help for \`${PACKAGE_NAME}\` command`, () => {
  const expectedOutput = `Runs automated package release and publishing

Usage:
  ${PACKAGE_NAME} [options]

Options
  -b, --branches        Git branches to release from    [array]
  -r, --repository-url  Git repository URL             [string]
      --debug           Output debugging information  [boolean]
  -d, --dry-run         Skip release and publishing   [boolean]
  -v, --version         Show version number           [boolean]
  -h, --help            Show help                     [boolean]`;
  const cliOptions = ["-h", "--help"];
  let originalConsoleLog: typeof console.log;
  beforeEach(() => {
    originalConsoleLog = console.log;
    console.log = vi.fn();
  });
  afterEach(() => {
    console.log = originalConsoleLog;
    vi.restoreAllMocks();
  });
  it.each(cliOptions)("should display the help content when using the `%s` command", option => {
    vi.spyOn(childProcess, "execSync").mockReturnValue(`npx release-change ${option}`);
    showHelp();
    expect(console.log).toHaveBeenCalledWith(expectedOutput);
  });
});
