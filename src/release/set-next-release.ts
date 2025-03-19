import type { Context } from "../cli/cli.types.js";
import type { ReleaseType } from "../commit-analyser/commit-analyser.types.js";

import { setLogger } from "../logger/index.js";
import { incrementVersion } from "./increment-version.js";

/**
 * Sets the next release based on the last one and the release type and adds it to the context where the CLI is running.
 * @param releaseType - The release type.
 * @param context - The context where the CLI is running.
 */
export const setNextRelease = (releaseType: ReleaseType, context: Context): void => {
  const { branch, config, lastRelease } = context;
  const logger = setLogger(config.debug);
  if (!branch || !config.branches.includes(branch)) return;
  if (!lastRelease) {
    logger.logWarn("No last release found; therefore, a new version will not be published.");
    return;
  }
  try {
    const branchConfig = config.releaseType[branch];
    if (branchConfig) {
      const version = incrementVersion(lastRelease.version, releaseType, branchConfig);
      if (version) {
        context.nextRelease = {
          gitTag: `v${version}`,
          version
        };
      } else new Error("Failed to increment version.");
    } else new Error(`Failed to retrieve release type config for branch ${branch}.`);
  } catch (error) {
    if (error instanceof Error) logger.logError(error.message);
    else logger.logError(`Unknown error: ${error}`);
    process.exitCode = 1;
  }
};
