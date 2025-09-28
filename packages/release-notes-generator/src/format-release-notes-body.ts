import type { ReleaseNotes } from "./release-notes-generator.types.js";

import { formatListItem } from "./format-list-item.js";

/**
 * Formats the release notes body in Markdown format.
 *
 * The release notes body should have at least one of the following properties to be formatted:
 * - `major`,
 * - `minor`,
 * - `patch`,
 * - `dependencies`.
 * @param releaseNotesBody - The release notes body to format.
 * @param [isReleaseNotesBodyForChangelog] - Whether the release notes body is for the `CHANGELOG.md` file or not.
 * @return The formatted release notes body as a string.
 */
export const formatReleaseNotesBody = (
  releaseNotesBody: ReleaseNotes["body"],
  isReleaseNotesBodyForChangelog = false
): string => {
  const { major, minor, patch, dependencies, changelog } = releaseNotesBody;
  const hasChanges = major || minor || patch || dependencies;
  if (hasChanges) {
    const headingLevel = isReleaseNotesBodyForChangelog ? "###" : "##";
    const majorChangesSection = major?.length
      ? `${headingLevel} Major changes\n\n${major.map(formatListItem).join("\n")}\n`
      : "";
    const minorChangesSection = minor?.length
      ? `${headingLevel} Minor changes\n\n${minor.map(formatListItem).join("\n")}\n`
      : "";
    const patchChangesSection = patch?.length
      ? `${headingLevel} Patch changes\n\n${patch.map(formatListItem).join("\n")}\n`
      : "";
    const dependenciesUpdatesSection = dependencies?.length
      ? `${headingLevel} Dependencies updates\n\n${dependencies.map(formatListItem).join("\n")}\n`
      : "";
    const fullChangelogSection = changelog ? `---\n\n${changelog}\n` : "";
    return [
      majorChangesSection,
      minorChangesSection,
      patchChangesSection,
      dependenciesUpdatesSection,
      fullChangelogSection
    ]
      .filter(Boolean)
      .join("\n");
  }
  return "";
};
