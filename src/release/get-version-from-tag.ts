import semver from "semver";

/**
 * Gets the version as per semantic versioning from a tag.
 * @param tag - The tag.
 * @return The version if valid.
 */
export const getVersionFromTag = (tag: string): string => {
  const version = semver.valid(tag);
  if (version) return version;
  throw new Error(`Failed to extract the version from tag ${tag}.`);
};
