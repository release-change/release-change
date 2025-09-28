import fs from "node:fs";

/**
 * Gets the package name from the `package.json` file.
 * @param path - The path to the `package.json` file.
 * @return The value of the `name` property if the file exists, `null` otherwise.
 */
export const getPackageName = (path: string): string | null => {
  if (fs.existsSync(path)) {
    const { name } = JSON.parse(fs.readFileSync(path, "utf8"));
    if (name) return name;
    throw new Error(`Failed to get the package name for ${path}: \`name\` property not found.`);
  }
  return null;
};
