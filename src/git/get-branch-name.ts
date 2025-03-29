import type { Logger } from "../logger/logger.types.js";

import { checkErrorType } from "../logger/check-error-type.js";
import { runCommandSync } from "./run-command-sync.js";

/**
 * Gets the current branch name, getting the `HEAD` ref or the remote branch (in case of detached `HEAD`).
 * @param logger - The logger object to log errors.
 * @return The branch name if found, `undefined` otherwise.
 */
export const getBranchName = (logger: Logger): string | undefined => {
  try {
    const headRef = runCommandSync(["rev-parse", "--abbrev-ref", "HEAD"], {
      encoding: "utf8"
    }).stdout.trim();
    if (headRef === "HEAD") {
      const remoteAlias = "origin/";
      const branch = runCommandSync(["show", "-s", "--pretty=%d", "HEAD"], { encoding: "utf8" })
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
