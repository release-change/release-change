import type { Commit, Context } from "@release-change/shared";

import { parseCommit } from "@release-change/commit-analyser";
import { addErrorToContext, checkErrorType, setLogger } from "@release-change/logger";
import { agreeInNumber, deepInspectObject, runCommandSync } from "@release-change/shared";

import { COMMIT_SEPARATOR } from "./constants.js";

/**
 * Gets the commits since the reference (Git tag or the whole history).
 * @param context - The context where the CLI is running.
 * @return An array containing the commits found and parsed.
 */
export const getCommitsSinceRef = (context: Context): Commit[] => {
  const { cwd, config, lastRelease } = context;
  const { debug, isMonorepo } = config;
  const logger = setLogger(debug);
  logger.setScope("git");
  try {
    const gitTag = lastRelease ? lastRelease.ref : null;
    const revisionRange = `${gitTag}..HEAD`;
    const args = ["log"];
    if (isMonorepo) args.push("--name-only");
    if (gitTag) args.push(revisionRange);
    const infoMessage = `Retrieving ${args.includes(revisionRange) ? `commits since ${gitTag}` : "all commits"}…`;
    logger.logInfo(infoMessage);
    const gitCommandResult = runCommandSync("git", args, { cwd });
    const { stdout } = gitCommandResult;
    const commits = stdout ? stdout.split(COMMIT_SEPARATOR) : [];
    const totalCommits = commits.length;
    const commitWord = agreeInNumber(totalCommits, ["commit", "commits"]);
    const parsedCommits = commits.map(commit => parseCommit(commit, context));
    if (debug) {
      logger.setDebugScope("git:get-commits-since-ref");
      logger.logDebug(`Command run: git ${args.join(" ")}`);
      logger.logDebug("Commits as returned by Git");
      logger.logDebug(deepInspectObject(commits));
      logger.logDebug("Parsed commits");
      logger.logDebug(deepInspectObject(parsedCommits));
    }
    logger.logInfo(`Found ${totalCommits} ${commitWord}.`);
    return parsedCommits;
  } catch (error) {
    logger.logError("Failed to find commits.");
    logger.logError(checkErrorType(error));
    addErrorToContext(error, context);
    process.exit(process.exitCode);
  }
};
