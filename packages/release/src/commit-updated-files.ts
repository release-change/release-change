/** biome-ignore-all lint/correctness/noUnusedImports: <TODO: drop this line when commands are run> */
import type { PackageManager } from "@release-change/get-packages";
import type { Context, PackageNextRelease } from "@release-change/shared";

import path from "node:path";

import { add, COMMITTER_EMAIL, COMMITTER_NAME, commit } from "@release-change/git";
import { setLogger } from "@release-change/logger";

/**
 * Commits the updated files.
 * @param packageNextRelease - The package to update.
 * @param pathname - The path to the package.
 * @param packageManager - The package manager used by the project.
 * @param context - The context where the CLI is running.
 */
export const commitUpdatedFiles = async (
  packageNextRelease: PackageNextRelease,
  pathname: string,
  packageManager: PackageManager,
  context: Context
): Promise<void> => {
  const { cwd, config } = context;
  const { debug } = config;
  const logger = setLogger(debug);
  if (packageManager) {
    const packageManifestFile = path.join(cwd, pathname, "package.json");
    const lockFile = path.join(
      cwd,
      pathname,
      packageManager === "pnpm" ? "pnpm-lock.yaml" : "package-lock.json"
    );
    // TODO: uncomment to run `git add` command
    // await add([packageManifestFile, lockFile]);
    const commitMessage = `chore(release): ${packageNextRelease.gitTag}\n\nCo-authored-by: ${COMMITTER_NAME} <${COMMITTER_EMAIL}>`;
    // TODO: uncomment to run `git commit` command
    // await commit(commitMessage);
    if (debug) {
      logger.setDebugScope("release:commit-updated-files");
      logger.logDebug(`Command run: git add ${packageManifestFile} ${lockFile}`);
      logger.logDebug(`Command run: git commit -m ${commitMessage}`);
    }
  } else {
    process.exitCode = 1;
    throw new Error(
      "The package manager is not found or is not one of those supported (npm or pnpm)."
    );
  }
};
