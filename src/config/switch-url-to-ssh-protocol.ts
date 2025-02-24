import {
  GITHUB_URL_PATTERN,
  HTTPS_URL_PATTERN,
  SSH_GITHUB_URL_REPLACEMENT_PATTERN,
  STANDALONE_SSH_URL_PATTERN
} from "./constants.js";

/**
 * Switches URL from non-SSH to SSH protocol.
 * @param url - The URL to parse.
 * @return The URL transformed to conform the SSH protocol.
 */
export const switchUrlToSshProtocol = (url: string): string => {
  switch (true) {
    case STANDALONE_SSH_URL_PATTERN.test(url):
      return url.replace(STANDALONE_SSH_URL_PATTERN, SSH_GITHUB_URL_REPLACEMENT_PATTERN);
    case HTTPS_URL_PATTERN.test(url):
      return url.replace(HTTPS_URL_PATTERN, SSH_GITHUB_URL_REPLACEMENT_PATTERN);
    case GITHUB_URL_PATTERN.test(url):
      return url.replace(GITHUB_URL_PATTERN, SSH_GITHUB_URL_REPLACEMENT_PATTERN);
    default:
      return url.replace("git+", "");
  }
};
