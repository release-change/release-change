import type { Context } from "../cli/cli.types.js";
import type { ReleaseType } from "../commit-analyser/commit-analyser.types.js";

import { inspect } from "node:util";

import { checkErrorType } from "../logger/check-error-type.js";
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
    if (branchConfig && releaseType) {
      const currentVersion = lastRelease.version;
      const version = incrementVersion(currentVersion, releaseType, branchConfig);
      context.nextRelease = {
        gitTag: `v${version}`,
        version
      };
      const previousReleaseInfoMessage = lastRelease.gitTag
        ? `The previous release is ${currentVersion}`
        : "There is no previous release";
      logger.logInfo(`${previousReleaseInfoMessage} and the next release version is ${version}.`);
    } else logger.logInfo("There are no relevant changes; therefore, no new version is released.");
    if (config.debug) {
      logger.setDebugScope("release:set-next-release");
      logger.logDebug(inspect(context.nextRelease, { depth: Number.POSITIVE_INFINITY }));
    }
  } catch (error) {
    logger.logError(checkErrorType(error));
    process.exitCode = 1;
  }
};
