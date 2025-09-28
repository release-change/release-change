import fs from "node:fs";

/**
 * Gets the package version from the `package.json` file.
 * @param path - The path to the `package.json` file.
 * @return The value of the `version` property if the file exists, `null` otherwise.
 */
export const getPackageVersion = (path: string): string | null => {
  if (fs.existsSync(path)) {
    const { version } = JSON.parse(fs.readFileSync(path, "utf8"));
    if (version) return version;
    throw new Error(
      `Failed to get the package version for ${path}: \`version\` property not found.`
    );
  }
  return null;
};
