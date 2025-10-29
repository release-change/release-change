import fs from "node:fs";

import { formatDetailedError } from "@release-change/shared";

/**
 * Gets the package name from the `package.json` file.
 * @param path - The path to the `package.json` file.
 * @return The value of the `name` property if the file exists, `null` otherwise.
 */
export const getPackageName = (path: string): string | null => {
  if (fs.existsSync(path)) {
    const { name } = JSON.parse(fs.readFileSync(path, "utf8"));
    if (name) {
      if (typeof name === "string") return name;
      throw formatDetailedError({
        title: `Failed to get the package name for ${path}`,
        message: "`name` property must be a string.",
        details: {
          output: `path: ${path}`
        }
      });
    }
    throw formatDetailedError({
      title: `Failed to get the package name for ${path}`,
      message: "`name` property not found.",
      details: {
        output: `path: ${path}`
      }
    });
  }
  return null;
};
