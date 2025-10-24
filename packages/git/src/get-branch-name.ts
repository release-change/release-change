import type { Logger } from "@release-change/logger";
import type { ContextBase } from "@release-change/shared";

import { checkErrorType } from "@release-change/logger";
import { runCommandSync } from "@release-change/shared";

/**
 * Gets the current branch name, getting the `HEAD` ref or the remote branch (in case of detached `HEAD`).
 * @param contextBase - The basic context where the CLI is running.
 * @param logger - The logger object to log errors.
 * @return The branch name if found, `undefined` otherwise.
 */
export const getBranchName = (contextBase: ContextBase, logger: Logger): string | undefined => {
  try {
    const { cwd } = contextBase;
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
    logger.setScope("git");
    logger.logError(checkErrorType(error));
    contextBase.errors.push(error);
    return undefined;
  }
};
