import { runCommandSync } from "@release-change/shared";

import { isGitRepository } from "./is-git-repository.js";

/**
 * Gets the tracked repositories.
 * @return The value returned by `git remote -v` if this is a Git repository, `null` otherwise.
 */
export const getTrackedRepositories = async (): Promise<string | null> => {
  if (await isGitRepository()) return runCommandSync("git", ["remote", "-v"]).stdout;
  return null;
};
