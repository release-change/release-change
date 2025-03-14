import type { Context } from "../cli/cli.types.js";
import type { LastRelease } from "./release.types.js";

import semver from "semver";

import { getLatestValidTag } from "../git/get-latest-valid-tag.js";
import { setLogger } from "../logger/index.js";
import { getRootPackageVersion } from "./get-root-package-version.js";

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
      const version = semver.valid(latestValidGitTag);
      if (version) {
        logger.logInfo(
          `Found Git tag ${latestValidGitTag} associated with version ${version} on branch ${branch}.`
        );
        lastRelease.gitTag = latestValidGitTag;
        lastRelease.version = version;
      } else throw new Error("Failed to extract the version from the latest Git tag.");
    } else {
      logger.logInfo(`No Git tag version found on branch ${branch}.`);
      const rootPackageVersion = semver.valid(getRootPackageVersion(cwd));
      if (rootPackageVersion) {
        logger.logInfo(`Found package version ${rootPackageVersion} on branch ${branch}.`);
        lastRelease.version = rootPackageVersion;
      } else logger.logInfo("No package version found.");
    }
    context.lastRelease = lastRelease;
  } catch (error) {
    if (error instanceof Error) logger.logError(error.message);
    else logger.logError(`Unknown error: ${error}`);
    process.exitCode = 1;
  }
};
