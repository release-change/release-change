import type { Context, LastRelease } from "@release-change/shared";

import { inspect } from "node:util";

import { getLatestValidTag } from "@release-change/git";
import { checkErrorType, setLogger } from "@release-change/logger";

/**
 * Sets the last release from the latest valid Git tag and adds it to the context where the CLI is running.
 * @param context - The context where the CLI is running.
 */
export const setLastRelease = (context: Context): void => {
  const { branch, config } = context;
  const logger = setLogger(config.debug);
  if (!branch || !config.branches.includes(branch)) return;
  try {
    const lastRelease: LastRelease = {
      ref: null
    };
    const latestValidGitTag = getLatestValidTag(context);
    if (latestValidGitTag) lastRelease.ref = latestValidGitTag;
    context.lastRelease = lastRelease;
    if (config.debug) {
      logger.setDebugScope("release:set-last-release");
      logger.logDebug(inspect(context.lastRelease, { depth: Number.POSITIVE_INFINITY }));
    }
  } catch (error) {
    logger.logError(checkErrorType(error));
    process.exitCode = 1;
  }
};
