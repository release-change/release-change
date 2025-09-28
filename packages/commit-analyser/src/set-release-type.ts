import type { Context, ReleaseType } from "@release-change/shared";

import { setLogger } from "@release-change/logger";

import {
  BREAKING_CHANGE,
  COMMIT_PREFIX_MAJOR,
  COMMIT_PREFIX_MINOR,
  COMMIT_PREFIX_PATCH
} from "./constants.js";

/**
 * Sets the release type, based on commit message and footer.
 * @param commitMessage - The parsed commit message.
 * @param commitFooter - The parsed commit footer.
 * @param context - The context where the CLI is running.
 * @return One of `"major"`, `"minor"` and `"patch"` if the commit correlates with a version change, `null` otherwise.
 */
export const setReleaseType = (
  commitMessage: string,
  commitFooter: string[],
  context: Context
): ReleaseType => {
  const { config } = context;
  const logger = setLogger(config.debug);
  logger.logInfo(`Analysing commit “${commitMessage}”…`);
  const releaseType: ReleaseType =
    commitFooter.some(line => line.match(BREAKING_CHANGE)) ||
    commitMessage.match(COMMIT_PREFIX_MAJOR)
      ? "major"
      : commitMessage.match(COMMIT_PREFIX_MINOR)
        ? "minor"
        : commitMessage.match(COMMIT_PREFIX_PATCH)
          ? "patch"
          : null;
  const releaseTypeInfoMessage = releaseType
    ? `The release type for the commit is ${releaseType}.`
    : "The commit does not trigger a release.";
  if (config.debug) {
    logger.setDebugScope("commit-analyser:set-release-type");
    logger.logDebug(`Release type: ${releaseType}`);
  }
  logger.logInfo(releaseTypeInfoMessage);
  return releaseType;
};
