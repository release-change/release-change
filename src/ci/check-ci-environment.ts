import type { Context } from "../cli/cli.types.js";

import { inspect } from "node:util";

import { setLogger } from "../logger/index.js";

export const checkCiEnvironment = (context: Context): void => {
  const { config, ci } = context;
  const { isCi, isPullRequest } = ci;
  const logger = setLogger(config.debug);
  if (config.debug) {
    logger.setDebugScope("ci");
    logger.logDebug(inspect(ci, { depth: Number.POSITIVE_INFINITY }));
  }
  if (!isCi) {
    config.dryRun = true;
    logger.logWarn(
      "This run is not triggered in a known CI environment; therefore, the dry-run mode is enabled."
    );
  } else if (isPullRequest) {
    logger.logWarn(
      "This run is triggered by a pull request; therefore, a new version will not be published."
    );
    process.exit();
  }
};
