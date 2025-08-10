import type { Context } from "@release-change/shared";

import { inspect } from "node:util";

import { setLogger } from "@release-change/logger";

/**
 * Checks whether the CI environment is usable for the run to proceed.
 * A usable CI environment does not provide any context when the run is triggered by a pull request.
 * An unknown CI environment does not prevent the run from proceeding but activates the dry-run mode.
 * @param context - The context where the CLI is running.
 * @return `true` if the CI environment is usable, `false` otherwise.
 */
export const isUsableCiEnvironment = (context: Context): boolean => {
  const { config, ci } = context;
  const { isCi, isPullRequest } = ci;
  const logger = setLogger(config.debug);
  if (config.debug) {
    logger.setDebugScope("ci");
    logger.logDebug(inspect(ci, { depth: Number.POSITIVE_INFINITY }));
  }
  if (isCi && isPullRequest) {
    logger.logWarn(
      "This run is triggered by a pull request; therefore, a new version will not be published."
    );
    return false;
  }
  if (!isCi) {
    config.dryRun = true;
    logger.logWarn(
      "This run is not triggered in a known CI environment; therefore, the dry-run mode is enabled."
    );
  }
  return true;
};
