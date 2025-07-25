import {
  GITHUB_URL_PATTERN,
  HTTPS_GITHUB_URL_REPLACEMENT_PATTERN,
  SSH_URL_PATTERN,
  STANDALONE_SSH_URL_PATTERN
} from "./constants.js";

/**
 * Switches URL from non-HTTPS to HTTPS protocol.
 * @param url - The URL to parse.
 * @return The URL transformed to conform the HTTPS protocol.
 */
export const switchUrlToHttpsProtocol = (url: string): string => {
  switch (true) {
    case STANDALONE_SSH_URL_PATTERN.test(url):
      return url.replace(STANDALONE_SSH_URL_PATTERN, HTTPS_GITHUB_URL_REPLACEMENT_PATTERN);
    case SSH_URL_PATTERN.test(url):
      return url.replace(SSH_URL_PATTERN, HTTPS_GITHUB_URL_REPLACEMENT_PATTERN);
    case GITHUB_URL_PATTERN.test(url):
      return url.replace(GITHUB_URL_PATTERN, HTTPS_GITHUB_URL_REPLACEMENT_PATTERN);
    default:
      return url.replace("git+", "");
  }
};
