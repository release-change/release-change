import fs from "node:fs";

/**
 * Gets the package version from the `package.json` file.
 * @param path - The path to the `package.json` file.
 * @return The value of the `version` property if the file exists and has this property, `null` otherwise.
 */
export const getPackageVersion = (path: string): string | null => {
  return fs.existsSync(path) ? (JSON.parse(fs.readFileSync(path, "utf8")).version ?? null) : null;
};
