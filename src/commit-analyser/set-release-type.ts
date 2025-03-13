import type { Context } from "../cli/cli.types.js";

import type { Commit, ReleaseType } from "./commit-analyser.types.js";

import {
  BREAKING_CHANGE,
  COMMIT_PREFIX_MAJOR,
  COMMIT_PREFIX_MINOR,
  COMMIT_PREFIX_PATCH
} from "./constants.js";

/**
 * Sets the release type, based on commit description and footer.
 * @param commit - The parsed commit.
 * @param context - The context where the CLI is running.
 * @return One of major, minor and patch if the commit correlates with a version change, `null` otherwise.
 */
export const setReleaseType = (commit: Commit, context: Context): ReleaseType => {
  const { description, footer } = commit;
  const { logger, config } = context;
  logger.logInfo(`Analysing commit: ${description}`);
  let releaseType: ReleaseType;
  let releaseTypeInfoMessage: string;
  if (footer.some(line => line.match(BREAKING_CHANGE)) || description.match(COMMIT_PREFIX_MAJOR)) {
    releaseType = "major";
    releaseTypeInfoMessage = "The release type for the commit is major.";
  } else if (description.match(COMMIT_PREFIX_MINOR)) {
    releaseType = "minor";
    releaseTypeInfoMessage = "The release type for the commit is minor.";
  } else if (description.match(COMMIT_PREFIX_PATCH)) {
    releaseType = "patch";
    releaseTypeInfoMessage = "The release type for the commit is patch.";
  } else {
    releaseType = null;
    releaseTypeInfoMessage = "The commit does not trigger a release.";
  }
  if (config.debug)
    logger.logDebug(`Release type: ${releaseType}`, "commit-analyser:set-release-type");
  logger.logInfo(releaseTypeInfoMessage);
  return releaseType;
};
