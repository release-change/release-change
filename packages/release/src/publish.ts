import type { PackagePublishing } from "@release-change/npm";
import type { ReleaseNotes } from "@release-change/release-notes-generator";
import type { Context } from "@release-change/shared";

import path from "node:path";

import { getPackageDependencies, getPackageManager } from "@release-change/get-packages";
import {
  cancelCommitsSinceRef,
  createTag,
  getCurrentCommitId,
  push,
  removeTag,
  removeTagOnRemoteRepository,
  setBranchName,
  switchToNewBranch
} from "@release-change/git";
import { createPullRequest } from "@release-change/github";
import {
  addErrorToContext,
  checkErrorType,
  isDetailedError,
  setLogger
} from "@release-change/logger";
import { preparePublishing, publishToRegistry } from "@release-change/npm";
import {
  createReleaseNotes,
  prepareReleaseNotes,
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
    branch,
    nextRelease
  } = context;
  const logger = setLogger(debug);
  logger.setScope("release");
  const commitRef = getCurrentCommitId(cwd);
  const newGitTags: string[] = [];
  let newBranch: string | undefined;
  try {
    if (nextRelease) {
      const packageManager = getPackageManager(cwd, env);
      const packagePublishingSet: PackagePublishing[] = [];
      const releaseNotesSet: ReleaseNotes[] = [];
      newBranch = setBranchName(branch, nextRelease);
      switchToNewBranch(newBranch, cwd);
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
        await updateLockFile(nextReleasePackage, context, packageManager);
        updateChangelogFile(nextReleasePackage, preparedReleaseNotes.body, cwd);
        await commitUpdatedFiles(nextReleasePackage, packageManager, context);
        createTag(nextReleasePackage, getCurrentCommitId(cwd), debug);
        newGitTags.push(nextReleasePackage.gitTag);
        const packagePublishing = await preparePublishing(nextReleasePackage, context);
        if (packagePublishing) packagePublishingSet.push(packagePublishing);
      }
      await push(context, { destinationBranch: newBranch, includeTags: true });
      await createPullRequest(newBranch, context);
      for (const releaseNotes of releaseNotesSet) {
        await createReleaseNotes(releaseNotes, context);
      }
      for (const packagePublishing of packagePublishingSet) {
        await publishToRegistry(packagePublishing, context);
      }
    }
  } catch (error) {
    logger.logError("Failed to publish the release.");
    logger.logError(checkErrorType(error));
    addErrorToContext(error, context);
    if (error instanceof Error) {
      const { cause } = error;
      if (cause && isDetailedError(cause)) {
        const {
          details: { command }
        } = cause;
        const isCommandGitPush =
          newBranch &&
          command === `git push --follow-tags ${context.config.remoteName} ${newBranch}`;
        if (
          command &&
          (isCommandGitPush ||
            command.startsWith("git add") ||
            command.startsWith("git commit") ||
            command.match(/^POST \S+\/(pull|release)s$/))
        ) {
          cancelCommitsSinceRef(commitRef, cwd, debug);
          for (const newGitTag of newGitTags) {
            removeTag(newGitTag, cwd, debug);
            await removeTagOnRemoteRepository(newGitTag, context);
          }
        }
      }
    }
    process.exitCode = process.exitCode || 1;
    throw error instanceof Error
      ? new Error(error.message, { cause: error.cause })
      : new Error(`${error}`);
  }
};
