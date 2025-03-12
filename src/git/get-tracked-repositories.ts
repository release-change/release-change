import { isGitRepository } from "./is-git-repository.js";
import { runCommandSync } from "./run-command-sync.js";

/**
 * Gets the tracks repositories.
 * @return The value returned by `git remote -v` if this is a Git repository, `null` otherwise.
 */
export const getTrackedRepositories = async (): Promise<string | null> => {
  if (await isGitRepository()) return runCommandSync(["remote", "-v"], { encoding: "utf8" }).stdout;
  return null;
};
