import type { Context } from "../cli/cli.types.js";
import type { LastRelease } from "./release.types.js";

import { inspect } from "node:util";

import semver from "semver";

import { getLatestValidTag } from "../git/get-latest-valid-tag.js";
import { checkErrorType } from "../logger/check-error-type.js";
import { setLogger } from "../logger/set-logger.js";
import { getRootPackageVersion } from "./get-root-package-version.js";
import { getVersionFromTag } from "./get-version-from-tag.js";

/**
 * Sets the last release from the latest valid Git tag or the root package version and adds it to the context where the CLI is running.
 * @param context - The context where the CLI is running.
 */
export const setLastRelease = (context: Context): void => {
  const { cwd, branch, config } = context;
  const logger = setLogger(config.debug);
  if (!branch || !config.branches.includes(branch)) return;
  try {
    const lastRelease: LastRelease = {
      gitTag: null,
      version: "0.0.0"
    };
    const latestValidGitTag = getLatestValidTag(context);
    if (latestValidGitTag) {
      const version = getVersionFromTag(latestValidGitTag);
      logger.logInfo(
        `Found Git tag ${latestValidGitTag} associated with version ${version} on branch ${branch}.`
      );
      lastRelease.gitTag = latestValidGitTag;
      lastRelease.version = version;
    } else {
      logger.logInfo(`No Git tag version found on branch ${branch}.`);
      const rootPackageVersion = semver.valid(getRootPackageVersion(cwd));
      if (rootPackageVersion) {
        logger.logInfo(`Found package version ${rootPackageVersion} on branch ${branch}.`);
        lastRelease.version = rootPackageVersion;
      } else logger.logInfo("No package version found.");
    }
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
