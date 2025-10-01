import type { ReleaseInfo } from "@release-change/shared";

/**
 * Generates a link in Markdown to a piece of release info.
 * @param releaseInfo - The release info to analyse.
 * @return The release info displayed within a link if the `url` property is set, the release info displayed as code otherwise.
 */
export const linkifyReleaseInfo = (releaseInfo: ReleaseInfo): string => {
  const { name, url } = releaseInfo;
  return `[${name}](${url})`;
};
