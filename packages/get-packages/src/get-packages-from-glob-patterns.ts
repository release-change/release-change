import type { Package } from "@release-change/shared/";
import type { GlobPatterns } from "./get-packages.types.js";

import fs from "node:fs/promises";
import path from "node:path";

import { browseDirectories } from "./browse-directories.js";
import { getPackageName } from "./get-package-name.js";
import { patternToRegex } from "./pattern-to-regex.js";

/**
 * Gets the packages from the given glob patterns.
 * @param globPatterns - The glob patterns to use.
 * @param cwd - The current working directory.
 * @return An array of package names and paths whose directory contains a `package.json` file with a `name` property.
 */
export const getPackagesFromGlobPatterns = async (
  globPatterns: GlobPatterns,
  cwd: string
): Promise<Package[]> => {
  const { include, exclude } = globPatterns;
  const includeRegexps = include.map(patternToRegex);
  const excludeRegexps = exclude.map(patternToRegex);
  const directories = (await browseDirectories(cwd)).map(async directory => {
    const isIncluded = includeRegexps.some(regex => regex.test(directory));
    const isExcluded = excludeRegexps.some(regex => regex.test(directory));
    if (isIncluded && !isExcluded) {
      const filePath = path.join(directory, "package.json");
      try {
        await fs.access(filePath);
        const packageName = getPackageName(filePath) ?? "";
        return { name: packageName, path: path.relative(cwd, directory) };
      } catch {
        return { name: "", path: "" };
      }
    }
    return { name: "", path: "" };
  });
  return (await Promise.all(directories)).filter(
    directory => Boolean(directory.name) && Boolean(directory.path)
  );
};
