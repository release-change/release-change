import type { Context } from "@release-change/shared";

import { getPackageManager } from "@release-change/get-packages";
import { createTag, getCurrentCommitId } from "@release-change/git";
import { checkErrorType, setLogger } from "@release-change/logger";

import { commitUpdatedFiles } from "./commit-updated-files.js";
import { updateLockFile } from "./update-lock-file.js";
import { updatePackageVersion } from "./update-package-version.js";

/**
 * Publishes the package
 * @param context - The context where the CLI is running.
 */
export const publish = async (context: Context): Promise<void> => {
  const {
    cwd,
    env,
    config: { debug },
    packages,
    nextRelease
  } = context;
  const logger = setLogger(debug);
  try {
    if (nextRelease) {
      const packageManager = getPackageManager(cwd, env);
      for (const nextReleasePackage of nextRelease) {
        const { name } = nextReleasePackage;
        const [packagePathname] = packages.filter(packageItem => packageItem.name === name);
        if (packagePathname) {
          const { path } = packagePathname;
          updatePackageVersion(nextReleasePackage, path, context);
          await updateLockFile(context, packageManager);
          await commitUpdatedFiles(nextReleasePackage, path, packageManager, context);
          const commitRef = getCurrentCommitId();
          createTag(nextReleasePackage, commitRef, debug);
        } else new Error(`Pathname not found for ${name || "root"} package.`);
      }
      // TODO: push in Git
      // TODO: create release notes
      // TODO: publish to registry
    }
  } catch (error) {
    logger.logError("Failed to publish the release.");
    logger.logError(checkErrorType(error));
    if (
      error instanceof Error &&
      error.cause === `git push --follow-tags ${context.config.remoteName} ${context.branch}`
    ) {
      // TODO: cancel last commit
      // TODO: remove Git tag
    }
    throw error instanceof Error
      ? new Error(error.message, { cause: error.cause })
      : new Error(`${error}`);
  }
};
