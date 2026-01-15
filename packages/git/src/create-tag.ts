import type { PackageNextRelease } from "@release-change/shared";

import { setLogger } from "@release-change/logger";
import { formatDetailedError, runCommandSync } from "@release-change/shared";

/**
 * Creates a Git tag.
 * @param packageNextRelease - The next release data to use.
 * @param commitRef - The commit reference to which the Git tag will be attached.
 * @param [debug] - Whether the CLI is running in debug mode or not.
 */
export const createTag = (
  packageNextRelease: PackageNextRelease,
  commitRef: string,
  debug = false
): void => {
  const logger = setLogger(debug);
  logger.setScope("git");
  if (commitRef) {
    const { name, gitTag } = packageNextRelease;
    const packageName = `${name ? name : "root"} package`;
    const args = ["tag", gitTag, "-m", gitTag, commitRef];
    const { status, stderr } = runCommandSync("git", args);
    if (debug) {
      logger.setDebugScope("git:create-tag");
      logger.logDebug(
        `Command run: git ${args.join(" ").replace(/-m ([-.a-z0-9@/]+)/, "-m '$1'")}`
      );
    }
    if (status) logger.logError(`Failed to create Git tag ${gitTag} for ${packageName}: ${stderr}`);
    else logger.logSuccess(`Created Git tag ${gitTag} for ${packageName}.`);
  } else {
    process.exitCode = 1;
    throw formatDetailedError({
      title: "Failed to create a Git tag",
      message: "The commit reference must not be empty.",
      details: { output: "commitRef: " }
    });
  }
};
