import type { Context } from "@release-change/shared";

import { getTrackedRepositories } from "./get-tracked-repositories.js";

/**
 * Gets the remote name for push from tracked repositories.
 * @param context - The context where the CLI is running.
 * @return The first remote name returned for push if there is at lease one tracked repository, `null` otherwise.
 */
export const getRemoteName = async (context: Context): Promise<string | null> => {
  const gitRemote = await getTrackedRepositories(context);
  if (gitRemote) {
    const remoteNames = [
      ...new Set(
        gitRemote
          .split("\n")
          .filter(remote => remote.endsWith("(push)"))
          .map(remote => remote.replaceAll(/^(\S+).+$/g, "$1"))
      )
    ];
    if (remoteNames.length) {
      const [remoteName] = remoteNames;
      return remoteName ? remoteName : null;
    }
    return null;
  }
  return null;
};
