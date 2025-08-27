import fs from "node:fs";

/**
 * Gets the package name from the `package.json` file.
 * @param path - The path to the `package.json` file.
 * @return The value of the `name` property if the file exists and has this property, `null` otherwise.
 */
export const getPackageName = (path: string): string | null => {
  return fs.existsSync(path) ? (JSON.parse(fs.readFileSync(path, "utf8")).name ?? null) : null;
};
