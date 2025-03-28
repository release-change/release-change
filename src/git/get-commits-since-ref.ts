import type { Context } from "../cli/cli.types.js";

import { inspect } from "node:util";

import { setLogger } from "../logger/index.js";
import { agreeInNumber } from "../shared/agree-in-number.js";
import { runCommandSync } from "./run-command-sync.js";

import { COMMIT_SEPARATOR } from "./constants.js";

export const getCommitsSinceRef = (context: Context): string[] => {
  const { config, lastRelease } = context;
  const logger = setLogger(config.debug);
  try {
    const gitTag = lastRelease ? lastRelease.gitTag : null;
    const args = gitTag ? ["log", `${gitTag}..HEAD`] : ["log"];
    const infoMessage = `Retrieving ${args.length > 1 ? `commits since ${gitTag}` : "all commits"}.`;
    logger.logInfo(infoMessage);
    const gitCommandResult = runCommandSync(args, { encoding: "utf8" });
    const { stdout } = gitCommandResult;
    const commits = stdout ? stdout.split(COMMIT_SEPARATOR) : [];
    const totalCommits = commits.length;
    const commitWord = agreeInNumber(totalCommits, ["commit", "commits"]);
    if (config.debug) {
      logger.setDebugScope("git:get-commits-since-ref");
      logger.logDebug(`Command run: git ${args.join(" ")}`);
      logger.logDebug(inspect(commits, { depth: Number.POSITIVE_INFINITY }));
    }
    logger.logInfo(`Found ${totalCommits} ${commitWord}.`);
    return commits;
  } catch (error) {
    if (error instanceof Error) logger.logError(error.message);
    else logger.logError(`Unknown error: ${error}`);
    process.exit(process.exitCode);
  }
};
