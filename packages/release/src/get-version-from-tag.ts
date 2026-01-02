import { GIT_TAG_PATTERN } from "@release-change/git";
import { validate } from "@release-change/semver";
import { formatDetailedError } from "@release-change/shared";

/**
 * Gets the version as per semantic versioning from a tag.
 * @param tag - The tag.
 * @return The version if valid.
 */
export const getVersionFromTag = (tag: string): string => {
  const version = validate(tag.replace(GIT_TAG_PATTERN, ""));
  if (version) return version;
  throw formatDetailedError({
    title: "Failed to get the version from tag",
    message: `No version could be extracted from tag ${tag}.`,
    details: {
      output: `tag: ${tag}`
    }
  });
};
