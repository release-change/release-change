/** biome-ignore-all lint/correctness/noUnusedImports: <TODO: drop this line when the file is written> */
/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <TODO: drop this line when the file is written> */
/** biome-ignore-all lint/correctness/noUnusedVariables: <TODO: drop this line when the file is written> */
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
  // TODO: uncomment when release notes are written to file
  // fs.writeFileSync(changelogFilePath, newFileData);
};
