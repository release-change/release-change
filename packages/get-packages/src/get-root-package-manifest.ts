import type { Package } from "@release-change/config";

import fs from "node:fs";

/**
 * Gets the content of the root package manifest (aka `package.json`).
 * @param path - The path to the root package file.
 * @return The content of the root `package.json` as JSON if the file is found.
 */
export const getRootPackageManifest = (path: string): Package => {
  if (fs.existsSync(path)) return JSON.parse(fs.readFileSync(path, "utf8"));
  throw new Error("Failed to get the root package manifest (`package.json`): file not found.");
};
