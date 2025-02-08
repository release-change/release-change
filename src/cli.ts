import type { Args } from "./types.js";

import process from "node:process";

import { parseOptions, showVersion } from "./utils.js";
import showHelp from "./utils/show-help.js";

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
