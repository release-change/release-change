import type { Context } from "@release-change/shared";

import { getPackageManager } from "@release-change/get-packages";
import { checkErrorType, setLogger } from "@release-change/logger";

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
    nextRelease
  } = context;
  const logger = setLogger(debug);
  try {
    if (nextRelease) {
      const packageManager = getPackageManager(cwd, env);
      for (const nextReleasePackage of nextRelease) {
        updatePackageVersion(nextReleasePackage, context);
        await updateLockFile(context, packageManager);
        // TODO: add files in Git
      }
      // TODO: commit updated files
      // TODO: get current commit ID
      // TODO: create Git tag for each updated package
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
