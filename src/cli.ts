import type { Args } from "./types.js";

import process from "node:process";

import { TAB, displayOptions, parseOptions } from "./utils.js";

import packageManager from "../package.json" with { type: "json" };

/**
 * Shows the help for the `release-change` command.
 */
export const showHelp = (): void => {
  const intro = "Runs automated package release and publishing";
  const usage = `Usage:\n${TAB}release-change [options]`;
  const options = displayOptions();
  const output = [intro, usage, options].join("\n".repeat(2));
  console.log(output);
};

/**
 * Shows the current version of `release-change`.
 */
export const showVersion = (): void => console.log(`v${packageManager.version}`);

/**
 * Runs the CLI
 * @return The exit code.
 */
const cli = (): number => {
  const args = process.argv.slice(2) as Args;
  const parsedOptions = parseOptions(args);
  const { help, version, ...options } = parsedOptions;
  if (help) {
    showHelp();
    return 0;
  }
  if (version) {
    showVersion();
    return 0;
  }
  console.log(help, version, options);
  return 0;
};

export default cli;
