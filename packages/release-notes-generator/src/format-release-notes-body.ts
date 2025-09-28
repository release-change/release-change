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
 * @return The formatted release notes body as a string.
 */
export const formatReleaseNotesBody = (releaseNotesBody: ReleaseNotes["body"]): string => {
  const { major, minor, patch, dependencies, changelog } = releaseNotesBody;
  const hasChanges = major || minor || patch || dependencies;
  if (hasChanges) {
    const majorChangesSection = major?.length
      ? `## Major changes\n\n${major.map(formatListItem).join("\n")}\n`
      : "";
    const minorChangesSection = minor?.length
      ? `## Minor changes\n\n${minor.map(formatListItem).join("\n")}\n`
      : "";
    const patchChangesSection = patch?.length
      ? `## Patch changes\n\n${patch.map(formatListItem).join("\n")}\n`
      : "";
    const dependenciesUpdatesSection = dependencies?.length
      ? `## Dependencies updates\n\n${dependencies.map(formatListItem).join("\n")}\n`
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
