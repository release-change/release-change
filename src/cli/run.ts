import type { CliOptions, Context } from "./cli.types.js";

import childProcess from "node:child_process";
import fs from "node:fs";
import util from "node:util";

import config from "../config/index.js";
import setLogger from "../logger/index.js";

import packageManager from "../../package.json" with { type: "json" };

const run = (cliOptions: CliOptions, context: Context): void => {
  const { name: packageName, version: packageVersion } = packageManager;
  const { cwd } = context;
  context.config = config(cliOptions);
  context.logger = setLogger(context.config.debug);
  const { logger } = context;
  logger.logInfo(`Running ${packageName} version ${packageVersion}`);
  if (context.config.debug) {
    logger.logInfo("Running in debug mode");
    logger.logDebug("Load context", "context");
    logger.logDebug(util.inspect(context, { depth: Number.POSITIVE_INFINITY }), "context");
    logger.logDebug("Load config", "config");
    const isConfigFile = fs.existsSync(`${cwd}/.releasechangerc`);
    if (isConfigFile) logger.logDebug(`Config loaded from \`${cwd}/.releasechangerc\``, "debug");
    else logger.logDebug("Config file not found", "config");
    logger.logDebug(util.inspect(context.config, { depth: Number.POSITIVE_INFINITY }), "config");
  }
  const runAutomatedReleaseText = `Run automated release from branch ${childProcess.execSync("git branch --show-current", { encoding: "utf8" })} on repository ${context.config.repositoryUrl}`;
  if (context.config.dryRun) logger.logWarn(`${runAutomatedReleaseText} in dry run mode`);
  else logger.logSuccess(runAutomatedReleaseText);
};

export default run;
