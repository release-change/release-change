import { execSync } from "node:child_process";
import { isGitRepository } from "../git/is-git-repository.js";

/**
 * Gets the remote repository URL for push.
 * @return The first URL returned by `git remote -v` for push if this is a Git repository, `null` otherwise.
 */
export const getRemoteRepositoryUrl = async (): Promise<string | null> => {
  if (await isGitRepository()) {
    const gitRemote = execSync("git remote -v", { encoding: "utf8" });
    if (gitRemote) {
      const remoteUrls = gitRemote
        .split("\n")
        .filter(remote => remote.endsWith("(push)"))
        .map(remote => remote.replaceAll(/^(\S+\s)|(\s\(.+\))$/g, ""));
      if (remoteUrls.length) {
        const [remoteUrl] = remoteUrls;
        return remoteUrl ?? null;
      }
      return null;
    }
    return null;
  }
  return null;
};
