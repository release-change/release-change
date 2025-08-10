import { getTrackedRepositories } from "@release-change/git";

import { switchUrlToHttpsProtocol } from "./switch-url-to-https-protocol.js";
import { switchUrlToSshProtocol } from "./switch-url-to-ssh-protocol.js";

/**
 * Gets the remote repository URL for push from tracked repositories.
 * @return The first URL returned for push (using SSH or HTTPS protocol) if there is at lease one tracked repository, `null` otherwise.
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
      if (remoteUrl)
        return remoteUrl.includes("git@")
          ? switchUrlToSshProtocol(remoteUrl)
          : switchUrlToHttpsProtocol(remoteUrl);
      return null;
    }
    return null;
  }
  return null;
};
