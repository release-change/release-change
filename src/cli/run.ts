import type { CliOptions, Context } from "./cli.types.js";

import debugConfig from "../config/debug-config.js";
import getConfig from "../config/index.js";
import checkBranch from "../git/check-branch.js";
import checkRepository from "../git/check-repository.js";
import setLogger from "../logger/index.js";

import packageManager from "../../package.json" with { type: "json" };

const run = async (cliOptions: CliOptions, context: Context): Promise<void> => {
  const { name: packageName, version: packageVersion } = packageManager;
  context.config = getConfig(cliOptions);
  context.logger = setLogger(context.config.debug);
  const { logger } = context;
  logger.logInfo(`Running ${packageName} version ${packageVersion}`);
  debugConfig(context);
  await checkRepository(logger);
  checkBranch(context as Required<Context>);
  console.log("context.branch", context.branch);
  console.log("context.config.dryRun", context.config.dryRun);
  console.log("exit", process.exitCode, process.exitCode ?? 0);
};

export default run;
