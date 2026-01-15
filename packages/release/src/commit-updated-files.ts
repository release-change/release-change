import type { PackageManager } from "@release-change/get-packages";
import type { Context, PackageNextRelease } from "@release-change/shared";

import fs from "node:fs";
import path from "node:path";
import { inspect } from "node:util";

import { add, COMMITTER_EMAIL, COMMITTER_NAME, commit } from "@release-change/git";
import { setLogger } from "@release-change/logger";
import { formatDetailedError } from "@release-change/shared";

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
    if (gitAddStatus) {
      process.exitCode = gitAddStatus;
      throw formatDetailedError({
        title: "Failed to run the `git` command",
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
    if (gitCommitStatus) {
      process.exitCode = gitCommitStatus;
      throw formatDetailedError({
        title: "Failed to run the `git` command",
        message: `The command failed with status ${gitAddStatus}`,
        details: {
          output:
            gitCommitStderr ||
            gitCommitStdout ||
            `Command failed with status code ${gitCommitStatus}.`,
          command: `git commit -m ${commitMessage}`
        }
      });
    }
    if (debug) {
      logger.setDebugScope("release:commit-updated-files");
      logger.logDebug(`Command run: git add ${filesToAdd.join(" ")}`);
      logger.logDebug(inspect(gitAddCommandResult, { depth: Number.POSITIVE_INFINITY }));
      logger.logDebug(`Command run: git commit -m '${commitMessage.replace(/\n/g, "\\n")}'`);
      logger.logDebug(inspect(gitCommitCommandResult, { depth: Number.POSITIVE_INFINITY }));
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
