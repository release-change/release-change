import { getTrackedRepositories } from "../git/get-tracked-repositories.js";

/**
 * Gets the remote repository URL for push from tracked repositories.
 * @return The first URL returned for push if there is at lease one tracked repository, `null` otherwise.
 */
export const getRemoteRepositoryUrl = async (): Promise<string | null> => {
  const gitRemote = await getTrackedRepositories();
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
};
