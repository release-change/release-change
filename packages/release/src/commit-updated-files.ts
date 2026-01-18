import type { PackageManager } from "@release-change/get-packages";
import type { Context, PackageNextRelease } from "@release-change/shared";

import fs from "node:fs";
import path from "node:path";

import { add, COMMITTER_EMAIL, COMMITTER_NAME, commit } from "@release-change/git";
import { setLogger } from "@release-change/logger";
import { deepInspectObject, formatDetailedError } from "@release-change/shared";

/**
 * Commits the updated files.
 * @param packageNextRelease - The next release data to use.
 * @param packageManager - The package manager used by the project.
 * @param context - The context where the CLI is running.
 */
export const commitUpdatedFiles = async (
  packageNextRelease: PackageNextRelease,
  packageManager: PackageManager,
  context: Context
): Promise<void> => {
  const { cwd, config } = context;
  const { debug } = config;
  const logger = setLogger(debug);
  if (packageManager) {
    if (debug) logger.setDebugScope("release:commit-updated-files");
    const { pathname } = packageNextRelease;
    const packageManifestFile = path.join(cwd, pathname, "package.json");
    const lockFile = path.join(
      cwd,
      pathname,
      packageManager === "pnpm" ? "pnpm-lock.yaml" : "package-lock.json"
    );
    const changelogFile = path.join(cwd, pathname, "CHANGELOG.md");
    const filesToAdd = fs.existsSync(lockFile)
      ? [packageManifestFile, lockFile, changelogFile]
      : [packageManifestFile, changelogFile];
    const gitAddCommandResult = await add(filesToAdd, cwd);
    const {
      status: gitAddStatus,
      stdout: gitAddStdout,
      stderr: gitAddStderr
    } = gitAddCommandResult;
    if (debug) {
      logger.logDebug(`Command run: git add ${filesToAdd.join(" ")}`);
      logger.logDebug(deepInspectObject(gitAddCommandResult));
    }
    if (gitAddStatus) {
      process.exitCode = gitAddStatus;
      throw formatDetailedError({
        title: "Failed to run the `git add` command",
        message: `The command failed with status ${gitAddStatus}`,
        details: {
          output:
            gitAddStderr || gitAddStdout || `Command failed with status code ${gitAddStatus}.`,
          command: `git add ${filesToAdd.join(" ")}`
        }
      });
    }
    const commitMessage = `chore: ${packageNextRelease.gitTag} [skip ci]\n\nCo-authored-by: ${COMMITTER_NAME} <${COMMITTER_EMAIL}>`;
    const gitCommitCommandResult = await commit(commitMessage, cwd);
    const {
      status: gitCommitStatus,
      stdout: gitCommitStdout,
      stderr: gitCommitStderr
    } = gitCommitCommandResult;
    if (debug) {
      logger.logDebug(`Command run: git commit -m '${commitMessage.replace(/\n/g, "\\n")}'`);
      logger.logDebug(deepInspectObject(gitCommitCommandResult));
    }
    if (gitCommitStatus) {
      process.exitCode = gitCommitStatus;
      throw formatDetailedError({
        title: "Failed to run the `git commit` command",
        message: `The command failed with status ${gitCommitStatus}`,
        details: {
          output:
            gitCommitStderr ||
            gitCommitStdout ||
            `Command failed with status code ${gitCommitStatus}.`,
          command: `git commit -m ${commitMessage}`
        }
      });
    }
  } else {
    process.exitCode = process.exitCode ?? 1;
    throw formatDetailedError({
      title: "Failed to commit the updated files",
      message: "The package manager is not found or is not one of those supported (npm or pnpm).",
      details: {
        output: `packageManager: ${packageManager}`
      }
    });
  }
};
