import type { Context, LastRelease, PackageLastRelease } from "@release-change/shared";

import { inspect } from "node:util";

import { getPackageVersion } from "@release-change/get-packages";
import { getLatestValidTag } from "@release-change/git";
import { checkErrorType, setLogger } from "@release-change/logger";
import { validate } from "@release-change/semver";

import { getVersionFromTag } from "./get-version-from-tag.js";

/**
 * Sets the last release from the latest valid Git tag, both for the whole repository and for each package, and adds it to the context where the CLI is running.
 * @param context - The context where the CLI is running.
 */
export const setLastRelease = (context: Context): void => {
  const { cwd, branch, config, packages } = context;
  const logger = setLogger(config.debug);
  if (!branch || !config.branches.includes(branch)) return;
  try {
    const lastRelease: LastRelease = {
      ref: null,
      packages: []
    };
    const latestValidGitTag = getLatestValidTag(context);
    if (latestValidGitTag) lastRelease.ref = latestValidGitTag;
    for (const { name } of packages) {
      const packageName = name || "root";
      const packageLastRelease: PackageLastRelease = {
        name,
        gitTag: null,
        version: "0.0.0"
      };
      const latestValidGitTag = getLatestValidTag(context, name);
      if (latestValidGitTag) {
        const version = getVersionFromTag(latestValidGitTag);
        logger.logInfo(
          `Found Git tag ${latestValidGitTag} for ${packageName} package, associated with version ${version} on branch ${branch}.`
        );
        packageLastRelease.gitTag = latestValidGitTag;
        packageLastRelease.version = version;
      } else {
        logger.logInfo(`No Git tag version found for ${packageName} package on branch ${branch}.`);
        const packageVersion = validate(getPackageVersion(`${cwd}/package.json`));
        if (packageVersion) {
          logger.logInfo(
            `Found package version ${packageVersion} for ${packageName} package on branch ${branch}.`
          );
          packageLastRelease.version = packageVersion;
        } else logger.logInfo(`No package version found for ${packageName} package.`);
      }
      lastRelease.packages.push(packageLastRelease);
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
