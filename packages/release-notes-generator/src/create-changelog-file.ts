import type { ReleaseNotes } from "./release-notes-generator.types.js";

import fs from "node:fs";

import { formatReleaseNotesBody } from "./format-release-notes-body.js";

/**
 * Creates a `CHANGELOG.md` file.
 * @param changelogFilePath - The path to the new changelog file.
 * @param header - The changelog file header to use.
 * @param releaseNotesBody - The release notes body to format.
 */
export const createChangelogFile = (
  changelogFilePath: string,
  header: string,
  releaseNotesBody: ReleaseNotes["body"]
): void => {
  const formattedReleaseNotesBody = formatReleaseNotesBody(releaseNotesBody, true);
  const newFileData = header + formattedReleaseNotesBody;
  fs.writeFileSync(changelogFilePath, newFileData);
};
