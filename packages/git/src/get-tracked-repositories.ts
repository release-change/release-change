import { setLogger } from "@release-change/logger";
import { runCommandSync } from "@release-change/shared";

import { isGitRepository } from "./is-git-repository.js";

/**
 * Gets the tracked repositories.
 * @param cwd - The current working directory.
 * @return The value returned by `git remote -v` if this is a Git repository, `null` otherwise.
 */
export const getTrackedRepositories = async (cwd: string): Promise<string | null> => {
  return (await isGitRepository(cwd, setLogger()))
    ? runCommandSync("git", ["remote", "-v"], { cwd }).stdout
    : null;
};
