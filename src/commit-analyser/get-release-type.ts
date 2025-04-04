import type { Context } from "../cli/cli.types.js";
import type { ReleaseType } from "./commit-analyser.types.js";

import { inspect } from "node:util";

import { checkErrorType } from "../logger/check-error-type.js";
import { setLogger } from "../logger/set-logger.js";
import { agreeInNumber } from "../shared/agree-in-number.js";
import { parseCommit } from "./parse-commit.js";
import { setReleaseType } from "./set-release-type.js";

/**
 * Gets the release type from the commits committed since the previous release or the beginning.
 * The release type can be one of the following, from most to least important:
 * 1. `"major"`,
 * 2. `"minor"`,
 * 3. `"patch"`,
 * 4. `null`.
 * @param commits - The commits to analyse.
 * @param context - The context where the CLI is running.
 * @return The most important release type found if commits are parsed successfully, `null` if there are no commits or an error is thrown.
 */
export const getReleaseType = (commits: string[], context: Context): ReleaseType => {
  const { config } = context;
  const logger = setLogger(config.debug);
  try {
    const releaseTypes = new Set<ReleaseType>();
    const totalCommits = commits.length;
    if (totalCommits) {
      for (const commit of commits) {
        const parsedCommit = parseCommit(commit, context);
        releaseTypes.add(setReleaseType(parsedCommit, context));
      }
      if (config.debug) {
        logger.setDebugScope("git:get-release-type");
        logger.logDebug(inspect(releaseTypes));
      }
      const commitWord = agreeInNumber(totalCommits, ["commit", "commits"]);
      const completeAnalysisSentence = `Analysis of ${totalCommits} ${commitWord} complete:`;
      switch (true) {
        case releaseTypes.has("major"):
          logger.logSuccess(`${completeAnalysisSentence} major release.`);
          return "major";
        case releaseTypes.has("minor"):
          logger.logSuccess(`${completeAnalysisSentence} minor release.`);
          return "minor";
        case releaseTypes.has("patch"):
          logger.logSuccess(`${completeAnalysisSentence} patch release.`);
          return "patch";
        default:
          logger.logSuccess(`${completeAnalysisSentence} no release.`);
          return null;
      }
    }
    logger.logWarn("No commits to analyse: no release.");
    return null;
  } catch (error) {
    logger.logError(checkErrorType(error));
    process.exitCode = 1;
    return null;
  }
};
