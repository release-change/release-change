import type { Args } from "../src/types.js";

import childProcess from "node:child_process";

import { assert, afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { parseOptions, showHelp, showVersion } from "../dist/cli.js";

import packageManager from "../package.json" with { type: "json" };

describe("options parsing", () => {
  it("should add the `--help` flag and return `true`", () => {
    const args: Args = ["--help"];
    const options = parseOptions(args);
    expect(options.help).toBe(true);
  });
  it("should add the `-h` alias and return `true`", () => {
    const args: Args = ["-h"];
    const options = parseOptions(args);
    expect(options.help).toBe(true);
  });
  it("should add the `--repository-url` flag and return the URL next to it", () => {
    const url = "https://github.com/release-change/release-change.git";
    const args: Args = ["--repository-url", url, "-d"];
    const options = parseOptions(args);
    expect(options.repositoryUrl).toBe(url);
  });
  it("should add the `--branches` flag and return an array containing the string(s) next to it", () => {
    const args: Args = ["--branches", "main", "next", "-d"];
    const options = parseOptions(args);
    assert.isArray(options.branches);
    assert.deepEqual(options.branches, ["main", "next"]);
  });
  it("should ignore a flag that does not exist", () => {
    const args: Args = ["--branches", "main", "--anOptionThatDoesNotExist"];
    const options = parseOptions(args);
    expect("anOptionThatDoesNotExist" in options).toBe(false);
  });
});

describe("display help for `release-change` command", () => {
  const expectedOutput = `Runs automated package release and publishing

Usage:
  release-change [options]

Options
  -b, --branches        Git branches to release from    [array]
  -r, --repository-url  Git repository URL             [string]
      --debug           Output debugging information  [boolean]
  -d, --dry-run         Skip release and publishing   [boolean]
  -v, --version         Show version number           [boolean]
  -h, --help            Show help                     [boolean]`;
  let originalConsoleLog: typeof console.log;

  beforeEach(() => {
    originalConsoleLog = console.log;
    console.log = vi.fn();
  });

  afterEach(() => {
    console.log = originalConsoleLog;
    vi.restoreAllMocks();
  });

  it("should display the help content", () => {
    vi.spyOn(childProcess, "execSync").mockReturnValue("npx release-change -h");
    showHelp();
    expect(console.log).toHaveBeenCalledWith(expectedOutput);
  });
});

describe("display `release-change` version", () => {
  const expectedVersion = packageManager.version;
  let originalConsoleLog: typeof console.log;

  beforeEach(() => {
    originalConsoleLog = console.log;
    console.log = vi.fn();
  });

  afterEach(() => {
    console.log = originalConsoleLog;
    vi.restoreAllMocks();
  });

  it(`should display a message saying \`v${expectedVersion}\``, () => {
    vi.spyOn(childProcess, "execSync").mockReturnValue("npx release-change -v");
    showVersion();
    expect(console.log).toHaveBeenCalledWith(`v${expectedVersion}`);
  });
});
