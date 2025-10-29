import type { PackageManifest } from "@release-change/config";

import fs from "node:fs";

import { formatDetailedError } from "@release-change/shared";

/**
 * Gets the content of the root package manifest (aka `package.json`).
 * @param path - The path to the root package file.
 * @return The content of the root `package.json` as JSON if the file is found.
 */
export const getRootPackageManifest = (path: string): PackageManifest => {
  if (fs.existsSync(path)) return JSON.parse(fs.readFileSync(path, "utf8"));
  throw formatDetailedError({
    title: "Failed to get the root package manifest (`package.json`)",
    message: "File not found.",
    details: {
      output: `fs.existsSync(${path}): false`
    }
  });
};
