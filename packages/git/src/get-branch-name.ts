import type { Logger } from "@release-change/logger";

import { checkErrorType } from "@release-change/logger";
import { runCommandSync } from "@release-change/shared";

/**
 * Gets the current branch name, getting the `HEAD` ref or the remote branch (in case of detached `HEAD`).
 * @param cwd - The current working directory.
 * @param logger - The logger object to log errors.
 * @return The branch name if found, `undefined` otherwise.
 */
export const getBranchName = (cwd: string, logger: Logger): string | undefined => {
  try {
    const headRef = runCommandSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
      cwd
    }).stdout.trim();
    if (headRef === "HEAD") {
      const remoteAlias = "origin/";
      const branch = runCommandSync("git", ["show", "-s", "--pretty=%d", "HEAD"], { cwd })
        .stdout.trim()
        .replace(/^\(|\)$/g, "")
        .split(", ")
        .find(branch => branch.startsWith(remoteAlias));
      return branch ? branch.replace(remoteAlias, "") : undefined;
    }
    return headRef;
  } catch (error) {
    logger.logError(checkErrorType(error));
    return undefined;
  }
};
