/** biome-ignore-all lint/correctness/noUnusedVariables: <TODO: drop this line when the API is used> */
import type { ReleaseNotes } from "@release-change/release-notes-generator";
import type { Context } from "@release-change/shared";

import { getPackageManager } from "@release-change/get-packages";
import { createTag, getCurrentCommitId, push } from "@release-change/git";
import { checkErrorType, setLogger } from "@release-change/logger";
import { type PackagePublishing, preparePublishing, publishToRegistry } from "@release-change/npm";
import { createReleaseNotes, prepareReleaseNotes } from "@release-change/release-notes-generator";

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
      const packagePublishingSet: PackagePublishing[] = [];
      const releaseNotesSet: ReleaseNotes[] = [];
      for (const nextReleasePackage of nextRelease) {
        const { name } = nextReleasePackage;
        const [packagePathname] = packages.filter(packageItem => packageItem.name === name);
        if (packagePathname) {
          const { pathname } = packagePathname;
          updatePackageVersion(nextReleasePackage, pathname, context);
          await updateLockFile(context, packageManager);
          await commitUpdatedFiles(nextReleasePackage, pathname, packageManager, context);
          const commitRef = getCurrentCommitId();
          createTag(nextReleasePackage, commitRef, debug);
          releaseNotesSet.push(prepareReleaseNotes(nextReleasePackage, context));
          const packagePublishing = await preparePublishing(nextReleasePackage, context);
          if (packagePublishing) packagePublishingSet.push(packagePublishing);
        } else {
          logger.logError(`Pathname not found for ${name || "root"} package.`);
          process.exitCode = 1;
        }
      }
      await push(context, { includeTags: true });
      for (const packagePublishing of packagePublishingSet) {
        await publishToRegistry(packagePublishing, context);
      }
      for (const releaseNotes of releaseNotesSet) {
        await createReleaseNotes(releaseNotes, context);
      }
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
    process.exitCode = process.exitCode || 1;
    throw error instanceof Error
      ? new Error(error.message, { cause: error.cause })
      : new Error(`${error}`);
  }
};
