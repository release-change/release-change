import type { PackageManifest } from "@release-change/config";

import fs from "node:fs";

/**
 * Gets the package dependencies from the `package.json` file.
 * @param path - The path to the `package.json` file.
 * @return An array of the dependency names extracted from the `dependencies` and `devDependencies` properties if the file exists, `null` otherwise.
 */
export const getPackageDependencies = (path: string): string[] | null => {
  if (fs.existsSync(path)) {
    const fileContent: PackageManifest = JSON.parse(fs.readFileSync(path, "utf8"));
    const { dependencies, devDependencies } = fileContent;
    return [...Object.keys(dependencies ?? {}), ...Object.keys(devDependencies ?? {})];
  }
  return null;
};
