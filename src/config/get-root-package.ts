import type { Package } from "./config.types.js";

import fs from "node:fs";

/**
 * Gets the content of the root package file.
 * @param path - The path to the root package file.
 * @return The content of the package file as JSON if the file is found, `null` otherwise.
 */
export const getRootPackage = (path: string): Package | null => {
  return fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, "utf8")) : null;
};
