import type { CliOptions, Context } from "./cli.types.js";

import childProcess from "node:child_process";

import debugConfig from "../config/debug-config.js";
import getConfig from "../config/index.js";
import setLogger from "../logger/index.js";

import packageManager from "../../package.json" with { type: "json" };

const run = (cliOptions: CliOptions, context: Context): void => {
  const { name: packageName, version: packageVersion } = packageManager;
  context.config = getConfig(cliOptions);
  context.logger = setLogger(context.config.debug);
  const { config, logger } = context;
  logger.logInfo(`Running ${packageName} version ${packageVersion}`);
  debugConfig(context);
  const runAutomatedReleaseText = `Run automated release from branch ${childProcess.execSync("git branch --show-current", { encoding: "utf8" })} on repository ${config.repositoryUrl}`;
  if (config.dryRun) logger.logWarn(`${runAutomatedReleaseText} in dry run mode`);
  else logger.logSuccess(runAutomatedReleaseText);
};

export default run;
