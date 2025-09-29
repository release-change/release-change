import type { PackagePublishing } from "@release-change/npm";
import type { Context } from "@release-change/shared";

import path from "node:path";

import { getPackageDependencies, getPackageManager } from "@release-change/get-packages";
import { createTag, getCurrentCommitId, push } from "@release-change/git";
import { checkErrorType, setLogger } from "@release-change/logger";
import { preparePublishing, publishToRegistry } from "@release-change/npm";
import {
  createReleaseNotes,
  prepareReleaseNotes,
  type ReleaseNotes,
  updateChangelogFile
} from "@release-change/release-notes-generator";

import { commitUpdatedFiles } from "./commit-updated-files.js";
import { updateLockFile } from "./update-lock-file.js";
import { updatePackageDependenciesVersions } from "./update-package-dependencies-versions.js";
import { updatePackageVersion } from "./update-package-version.js";

/**
 * Publishes the package
 * @param context - The context where the CLI is running.
 */
export const publish = async (context: Context): Promise<void> => {
  const {
    cwd,
    env,
    config: { debug, isMonorepo },
    nextRelease
  } = context;
  const logger = setLogger(debug);
  logger.setScope("release");
  try {
    if (nextRelease) {
      const packageManager = getPackageManager(cwd, env);
      const packagePublishingSet: PackagePublishing[] = [];
      const releaseNotesSet: ReleaseNotes[] = [];
      for (const nextReleasePackage of nextRelease) {
        const { pathname } = nextReleasePackage;
        const packageDependencies = getPackageDependencies(
          path.join(cwd, pathname, "package.json")
        );
        const packageDependenciesToUpdate =
          isMonorepo && packageDependencies
            ? nextRelease.filter(packageNextRelease =>
                packageDependencies.includes(packageNextRelease.name)
              )
            : null;
        const preparedReleaseNotes = prepareReleaseNotes(
          nextReleasePackage,
          packageDependencies,
          context
        );
        releaseNotesSet.push(preparedReleaseNotes);
        updatePackageVersion(nextReleasePackage, context);
        if (packageDependenciesToUpdate)
          updatePackageDependenciesVersions(
            nextReleasePackage,
            packageDependenciesToUpdate,
            context
          );
        await updateLockFile(context, packageManager);
        updateChangelogFile(nextReleasePackage, preparedReleaseNotes.body, cwd);
        await commitUpdatedFiles(nextReleasePackage, packageManager, context);
        const commitRef = getCurrentCommitId(cwd);
        createTag(nextReleasePackage, commitRef, debug);
        const packagePublishing = await preparePublishing(nextReleasePackage, context);
        if (packagePublishing) packagePublishingSet.push(packagePublishing);
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
