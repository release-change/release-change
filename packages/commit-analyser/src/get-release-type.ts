import type { Commit, Context, ReleaseType } from "@release-change/shared";
import type { PackageReleaseType } from "./commit-analyser.types.js";

import { inspect } from "node:util";

import { setLogger } from "@release-change/logger";
import { agreeInNumber } from "@release-change/shared";

import { adjustReleaseType } from "./adjust-release-type.js";

/**
 * Gets the release type from the commits which have been committed since the previous release or the beginning.
 *
 * The release type can be one of the following, from most to least important:
 * 1. `"major"`,
 * 2. `"minor"`,
 * 3. `"patch"`,
 * 4. `null`.
 *
 * In a monorepo context, the release type is also determined according to the internal dependencies.
 * @param commits - The commits to analyse.
 * @param context - The context where the CLI is running.
 * @return  An array of objects containing the most important release type found for each package if commits are parsed successfully, `null` if there are no commits or an error is thrown.
 */
export const getReleaseType = (commits: Commit[], context: Context): PackageReleaseType[] => {
  const { config, packages } = context;
  const { debug } = config;
  const logger = setLogger(debug);
  logger.setScope("commit-analyser");
  const packageReleaseTypes: PackageReleaseType[] = packages.map(packageItem => ({
    name: packageItem.name,
    releaseType: null
  }));
  if (debug) logger.setDebugScope("commit-analyser:get-release-type");
  const totalCommits = commits.length;
  if (totalCommits) {
    const packagesPaths = packages.map(packageItem => packageItem.pathname);
    const releaseTypesPerPackage = new Map<string, Set<ReleaseType>>();
    for (const commit of commits) {
      const { releaseType, modifiedFiles } = commit;
      if (modifiedFiles?.length) {
        for (const modifiedFile of modifiedFiles) {
          const relatedPackagePath = packagesPaths.find(packagePath =>
            modifiedFile.startsWith(packagePath)
          );
          const relatedPackageName =
            packages.find(packageItem => packageItem.pathname === relatedPackagePath)?.name ?? "";
          const releaseTypes =
            releaseTypesPerPackage.get(relatedPackageName) ?? new Set<ReleaseType>();
          releaseTypes.add(releaseType);
          releaseTypesPerPackage.set(relatedPackageName, releaseTypes);
        }
      } else {
        const releaseTypes = releaseTypesPerPackage.get("") ?? new Set<ReleaseType>();
        releaseTypes.add(releaseType);
        releaseTypesPerPackage.set("", releaseTypes);
      }
      if (debug) {
        logger.logDebug(`Release types by package for commit “${commit.message}”:`);
        logger.logDebug(inspect(releaseTypesPerPackage));
      }
    }
    const adjustedReleaseTypesPerPackage = new Map(
      adjustReleaseType(context, releaseTypesPerPackage)
    );
    if (debug) {
      logger.logDebug("Overall adjusted release types by package:");
      logger.logDebug(inspect(adjustedReleaseTypesPerPackage));
    }
    const commitWord = agreeInNumber(totalCommits, ["commit", "commits"]);
    logger.logSuccess(`Analysis of ${totalCommits} ${commitWord} complete.`);
    const packageReleaseTypes: PackageReleaseType[] = [];
    for (const [name, releaseTypes] of adjustedReleaseTypesPerPackage) {
      const packageName = `${name ? name : "root"} package`;
      let releaseType: ReleaseType;
      switch (true) {
        case releaseTypes.has("major"): {
          releaseType = "major";
          logger.logSuccess(`For ${packageName}: major release.`);
          break;
        }
        case releaseTypes.has("minor"): {
          releaseType = "minor";
          logger.logSuccess(`For ${packageName}: minor release.`);
          break;
        }
        case releaseTypes.has("patch"): {
          releaseType = "patch";
          logger.logSuccess(`For ${packageName}: patch release.`);
          break;
        }
        default: {
          releaseType = null;
          logger.logSuccess(`For ${packageName}: no release.`);
          break;
        }
      }
      packageReleaseTypes.push({ name, releaseType });
    }
    return packageReleaseTypes;
  }
  logger.logWarn("No commits to analyse: no release.");
  return packageReleaseTypes;
};
