import type { PackageReleaseType } from "@release-change/commit-analyser";
import type { Context, PackageNextRelease } from "@release-change/shared";

import { inspect } from "node:util";

import { checkErrorType, setLogger } from "@release-change/logger";

import { incrementVersion } from "./increment-version.js";

/**
 * Sets the next release based on the last one and the release types of each concerned package and adds it to the context where the CLI is running.
 * @param packageReleaseTypes - The release types for each package.
 * @param context - The context where the CLI is running.
 */
export const setNextRelease = (
  packageReleaseTypes: PackageReleaseType[],
  context: Context
): void => {
  const { branch, config, lastRelease } = context;
  const logger = setLogger(config.debug);
  if (!branch || !config.branches.includes(branch)) return;
  if (!lastRelease) {
    logger.logWarn("No last release found; therefore, a new version will not be published.");
    return;
  }
  try {
    const branchConfig = config.releaseType[branch];
    const nonNullablePackageReleaseTypes = packageReleaseTypes.filter(packageReleaseType =>
      Boolean(packageReleaseType.releaseType)
    );
    if (branchConfig && nonNullablePackageReleaseTypes.length) {
      const nextRelease: PackageNextRelease[] = [];
      for (const packageReleaseType of nonNullablePackageReleaseTypes) {
        const { name, releaseType } = packageReleaseType;
        const packageLastRelease = lastRelease.packages.find(
          packageItem => packageItem.name === name
        );
        if (packageLastRelease) {
          const { gitTag, version: currentVersion } = packageLastRelease;
          const version = incrementVersion(currentVersion, releaseType, branchConfig);
          nextRelease.push({
            name,
            gitTag: `${name ? `${name}/` : ""}v${version}`,
            version
          });
          const previousReleaseInfoMessage = gitTag
            ? `the previous release is ${currentVersion}`
            : "there is no previous release";
          logger.logInfo(
            `For ${name || "root"} package, ${previousReleaseInfoMessage} and the next release version is ${version}.`
          );
        } else logger.logWarn(`No last release found for ${name || "root"} package.`);
      }
      context.nextRelease = nextRelease;
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
