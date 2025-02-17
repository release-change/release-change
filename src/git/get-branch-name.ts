import type { Logger } from "../logger/logger.types.js";

import { execSync } from "node:child_process";

/**
 * Gets the current branch name, getting the `HEAD` ref or the remote branch (in case of detached `HEAD`).
 * @param logger - The logger object to log errors.
 * @return The branch name if found, `undefined` otherwise.
 */
const getBranchName = (logger: Logger): string | undefined => {
  try {
    const headRef = execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf8" }).trim();
    if (headRef === "HEAD") {
      const remoteAlias = "origin/";
      const branch = execSync("git show -s --pretty=%d HEAD", { encoding: "utf8" })
        .trim()
        .replace(/^\(|\)$/g, "")
        .split(", ")
        .find(branch => branch.startsWith(remoteAlias));
      return branch ? branch.replace(remoteAlias, "") : undefined;
    }
    return headRef;
  } catch (error) {
    const errorOutput =
      error instanceof Error
        ? `An error occurred when running the Git command: ${error.message}`
        : `An unknown error occurred when running the Git command: ${error}`;
    logger.logError(errorOutput);
    return undefined;
  }
};

export default getBranchName;
