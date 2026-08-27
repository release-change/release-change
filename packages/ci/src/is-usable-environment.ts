import type { Context } from "@release-change/shared";

import { setLogger } from "@release-change/logger";
import { deepInspectObject } from "@release-change/shared";

/**
 * Checks whether the environment is usable for the run to proceed.
 *
 * A usable CI environment does not provide any context when the run is triggered by a pull request.
 * An unknown app or CI environment does not prevent the run from proceeding but activates the dry-run mode.
 * @param context - The context where the CLI is running.
 * @return `true` if the environment is usable, `false` otherwise.
 */
export const isUsableEnvironment = (context: Context): boolean => {
  const { config, ci, isAppTool } = context;
  const { isCi, isPullRequest } = ci;
  const logger = setLogger(config.debug);
  logger.setScope("ci");
  if (config.debug) {
    logger.setDebugScope("ci:is-usable-environment");
    logger.logDebug(`ci: ${deepInspectObject(ci)}`);
    logger.logDebug(`isAppTool: ${isAppTool}`);
  }
  if (isCi && isPullRequest) {
    logger.logWarn(
      "This run is triggered by a pull request; therefore, a new version will not be published."
    );
    return false;
  }
  if (!isAppTool && !isCi) {
    config.dryRun = true;
    logger.logWarn(
      "This run is not triggered in a known app or CI environment; therefore, the dry-run mode is enabled."
    );
  }
  return true;
};
