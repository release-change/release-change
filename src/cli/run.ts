import type { CliOptions, Context } from "./cli.types.js";

import childProcess from "node:child_process";
import fs from "node:fs";
import util from "node:util";

import config from "../config/index.js";
import logger from "../logger/index.js";

import packageManager from "../../package.json" with { type: "json" };

const run = (cliOptions: CliOptions, context: Context): void => {
  const { name: packageName, version: packageVersion } = packageManager;
  const { cwd } = context;
  context.config = config(cliOptions);
  context.logger = logger;
  context.logger.logInfo(`Running ${packageName} version ${packageVersion}`);
  if (context.config.debug) {
    context.logger.logInfo("Running in debug mode");
    context.logger.logInfo("Load context");
    context.logger.logInfo(util.inspect(context, { depth: Number.POSITIVE_INFINITY }));
    context.logger.logInfo("Load config");
    const isConfigFile = fs.existsSync(`${cwd}/.releasechangerc`);
    if (isConfigFile) context.logger.logInfo(`Config loaded from \`${cwd}/.releasechangerc\``);
    else context.logger.logInfo("Config file not found");
    context.logger.logInfo(util.inspect(context.config, { depth: Number.POSITIVE_INFINITY }));
  }
  const runAutomatedReleaseText = `Run automated release from branch ${childProcess.execSync("git branch --show-current", { encoding: "utf8" })} on repository ${context.config.repositoryUrl}`;
  if (context.config.dryRun) context.logger.logWarn(`${runAutomatedReleaseText} in dry run mode`);
  else context.logger.logSuccess(runAutomatedReleaseText);
};

export default run;
