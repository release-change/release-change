import type { CliOptions, Context } from "./cli.types.js";

import childProcess from "node:child_process";
import fs from "node:fs";
import util from "node:util";

import getConfig from "../config/index.js";
import setLogger from "../logger/index.js";

import { CONFIG_FILE_NAME } from "../config/constants.js";

import packageManager from "../../package.json" with { type: "json" };

const run = (cliOptions: CliOptions, context: Context): void => {
  const { name: packageName, version: packageVersion } = packageManager;
  const { cwd } = context;
  context.config = getConfig(cliOptions);
  context.logger = setLogger(context.config.debug);
  const { config, logger } = context;
  logger.logInfo(`Running ${packageName} version ${packageVersion}`);
  if (config.debug) {
    logger.logInfo("Running in debug mode");
    logger.logDebug("Load context", "context");
    logger.logDebug(util.inspect(context, { depth: Number.POSITIVE_INFINITY }), "context");
    logger.logDebug("Load config", "config");
    const isConfigFile = fs.existsSync(`${cwd}/${CONFIG_FILE_NAME}`);
    if (isConfigFile) logger.logDebug(`Config loaded from \`${cwd}/${CONFIG_FILE_NAME}\``, "debug");
    else logger.logDebug("Config file not found", "config");
    logger.logDebug(util.inspect(config, { depth: Number.POSITIVE_INFINITY }), "config");
  }
  const runAutomatedReleaseText = `Run automated release from branch ${childProcess.execSync("git branch --show-current", { encoding: "utf8" })} on repository ${config.repositoryUrl}`;
  if (config.dryRun) logger.logWarn(`${runAutomatedReleaseText} in dry run mode`);
  else logger.logSuccess(runAutomatedReleaseText);
};

export default run;
