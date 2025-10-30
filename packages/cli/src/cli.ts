import type { ContextBase } from "@release-change/shared";
import type { Args } from "./cli.types.js";

import process from "node:process";

import { parseCliOptions } from "./parse-cli-options.js";
import { run } from "./run.js";
import { showHelp } from "./show-help.js";
import { showVersion } from "./show-version.js";

/**
 * Runs the CLI
 * @return The exit code.
 */
export const cli = async (): Promise<number> => {
  const { argv, cwd, env } = process;
  const args = argv.slice(2) as Args;
  const parsedCliOptions = parseCliOptions(args);
  const { help, version, ...cliOptions } = parsedCliOptions;
  const context: ContextBase = {
    cwd: cwd(),
    env,
    config: { debug: Boolean(cliOptions.debug) },
    errors: []
  };
  if (help) {
    showHelp();
    return 0;
  }
  if (version) {
    showVersion();
    return 0;
  }
  await run(cliOptions, context);
  return Number(process.exitCode ?? 0);
};
