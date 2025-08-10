import { inspect } from "node:util";

import { checkErrorType, setLogger } from "@release-change/logger";
import { agreeInNumber, type Context, runCommandSync } from "@release-change/shared";

import { COMMIT_SEPARATOR } from "./constants.js";

/**
 * Gets the commits since the reference (Git tag or the whole history).
 * @param context - The context where the CLI is running.
 * @return An array containing the commits found.
 */
export const getCommitsSinceRef = (context: Context): string[] => {
  const { config, lastRelease } = context;
  const logger = setLogger(config.debug);
  try {
    const gitTag = lastRelease ? lastRelease.gitTag : null;
    const args = gitTag ? ["log", `${gitTag}..HEAD`] : ["log"];
    const infoMessage = `Retrieving ${args.length > 1 ? `commits since ${gitTag}` : "all commits"}.`;
    logger.logInfo(infoMessage);
    const gitCommandResult = runCommandSync("git", args);
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
    logger.logError("Failed to find commits.");
    logger.logError(checkErrorType(error));
    process.exit(process.exitCode);
  }
};
