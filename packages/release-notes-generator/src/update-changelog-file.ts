/** biome-ignore-all lint/correctness/noUnusedVariables: <TODO: drop this line when the file is written> */
import type { PackageNextRelease } from "@release-change/shared";
import type { ReleaseNotes } from "./release-notes-generator.types.js";

import fs from "node:fs";
import path from "node:path";

import { getPackageName } from "@release-change/get-packages";

import { createChangelogFile } from "./create-changelog-file.js";
import { formatReleaseNotesBody } from "./format-release-notes-body.js";

/**
 * Updates the package `CHANGELOG.md` file.
 *
 * In case the changelog file does not exist or is empty, it is filled without the full changelog section.
 * @param packageNextRelease - The next release data to use.
 * @param releaseNotesBody - The release notes body to format.
 * @param cwd - The current working directory.
 */
export const updateChangelogFile = (
  packageNextRelease: PackageNextRelease,
  releaseNotesBody: ReleaseNotes["body"],
  cwd: string
) => {
  const { name, pathname, version } = packageNextRelease;
  const { major, minor, patch, dependencies } = releaseNotesBody;
  const packageName = name || getPackageName(path.join(cwd, pathname, "package.json"));
  const changelogFilePath = path.join(cwd, pathname, "CHANGELOG.md");
  const versionHeader = `\n\n## ${version}\n\n`;
  if (fs.existsSync(changelogFilePath)) {
    const fileData = fs.readFileSync(changelogFilePath, "utf-8");
    if (fileData) {
      const formattedReleaseNotesBody = formatReleaseNotesBody(releaseNotesBody, true);
      const blankLineIndex = fileData.indexOf("\n\n");
      const updatedFileData =
        blankLineIndex === -1
          ? `${fileData}\n\n${formattedReleaseNotesBody}`
          : `${fileData.slice(0, blankLineIndex)}${versionHeader}${formattedReleaseNotesBody}${fileData.slice(blankLineIndex + 1)}`;
      // TODO: uncomment when release notes are written to file
      // fs.writeFileSync(changelogFilePath, updatedFileData);
    } else {
      const newFileHeader = `# ${packageName ?? "root package"}${versionHeader}`;
      createChangelogFile(changelogFilePath, newFileHeader, { major, minor, patch, dependencies });
    }
  } else {
    const newFileHeader = `# ${packageName ?? "root package"}${versionHeader}`;
    createChangelogFile(changelogFilePath, newFileHeader, { major, minor, patch, dependencies });
  }
};
