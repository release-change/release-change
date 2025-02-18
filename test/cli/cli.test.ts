import type { Args } from "../../src/cli/cli.types.js";

import childProcess from "node:child_process";
import process from "node:process";

import { assert, afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { cli } from "../../src/cli/index.js";
import { parseCliOptions } from "../../src/cli/parse-cli-options.js";
import { run } from "../../src/cli/run.js";
import { showHelp } from "../../src/cli/show-help.js";
import { showVersion } from "../../src/cli/show-version.js";

import packageManager from "../../package.json" with { type: "json" };

const expectedPackageName = packageManager.name;

describe("CLI options parsing", () => {
  it("should add the `--help` flag and return `true`", () => {
    const args: Args = ["--help"];
    const cliOptions = parseCliOptions(args);
    expect(cliOptions.help).toBe(true);
  });
  it("should add the `-h` alias and return `true`", () => {
    const args: Args = ["-h"];
    const cliOptions = parseCliOptions(args);
    expect(cliOptions.help).toBe(true);
  });
  it("should add the `--repository-url` flag and return the URL next to it", () => {
    const url = "https://github.com/release-change/release-change.git";
    const args: Args = ["--repository-url", url, "-d"];
    const cliOptions = parseCliOptions(args);
    expect(cliOptions.repositoryUrl).toBe(url);
  });
  it("should add the `--branches` flag and return an array containing the string(s) next to it", () => {
    const args: Args = ["--branches", "main", "next", "-d"];
    const cliOptions = parseCliOptions(args);
    assert.isArray(cliOptions.branches);
    assert.deepEqual(cliOptions.branches, ["main", "next"]);
  });
  it("should ignore a flag that does not exist", () => {
    const args: Args = ["--branches", "main", "--anOptionThatDoesNotExist"];
    const cliOptions = parseCliOptions(args);
    expect("anOptionThatDoesNotExist" in cliOptions).toBe(false);
  });
});

describe(`display help for \`${expectedPackageName}\` command`, () => {
  const expectedOutput = `Runs automated package release and publishing

Usage:
  ${expectedPackageName} [options]

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

describe(`display \`${expectedPackageName}\` version`, () => {
  const expectedVersion = packageManager.version;
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
});

describe("CLI behaviour when running with some CLI options", () => {
  const cliOptions = ["-h", "--help", "-v", "--version"];
  let originalProcessArgv: string[];

  beforeEach(() => {
    originalProcessArgv = process.argv;
  });

  afterEach(() => {
    process.argv = originalProcessArgv;
    vi.restoreAllMocks();
  });

  it.each(cliOptions)("should not call `run()` when `%s` is used", cliOption => {
    vi.mock("../../src/cli/run.js", () => ({
      run: vi.fn()
    }));
    process.argv = ["pnpm", expectedPackageName, cliOption];
    cli();
    expect(run).not.toHaveBeenCalled();
  });
});
