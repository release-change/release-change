import type { Args } from "../../src/cli/cli.types.js";

import { assert, describe, expect, it } from "vitest";

import { parseCliOptions } from "../../src/cli/parse-cli-options.js";

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
