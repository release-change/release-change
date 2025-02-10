import type { Args } from "./types.js";

import process from "node:process";

import run from "./run.js";
import parseCliOptions from "./utils/parse-cli-options.js";
import showHelp from "./utils/show-help.js";
import showVersion from "./utils/show-version.js";

/**
 * Runs the CLI
 * @return The exit code.
 */
const cli = (): number => {
  const args = process.argv.slice(2) as Args;
  const parsedCliOptions = parseCliOptions(args);
  const { help, version, ...cliOptions } = parsedCliOptions;
  if (help) {
    showHelp();
    return 0;
  }
  if (version) {
    showVersion();
    return 0;
  }
  run(cliOptions);
  return 0;
};

export default cli;
