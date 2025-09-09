import type { Context } from "@release-change/shared";

import { getPackageManager } from "@release-change/get-packages";
import { checkErrorType, setLogger } from "@release-change/logger";

import { commitUpdatedFiles } from "./commit-updated-files.js";
//import { cancelLastCommit } from "../git/cancel-last-commit.js";
//import { createTag } from "../git/create-tag.js";
//import { getCurrentCommitId } from "../git/get-current-commit-id.js";
//import { push } from "../git/push.js";
//import { removeTag } from "../git/remove-tag.js";
import { updateLockFile } from "./update-lock-file.js";
import { updatePackageVersion } from "./update-package-version.js";
//import { publishToRegistry } from "../npm/publish-to-registry.js";
//import { createReleaseNotes } from "../release-notes-generator/create-release-notes.js";
//import { commitUpdatedFiles } from "./commit-updated-files.js";
//import { updateRootLockFile } from "./update-root-lock-file.js";
//import { updateRootPackageVersion } from "./update-root-package-version.js";

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
          // TODO: get current commit ID
          // TODO: create Git tag
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
