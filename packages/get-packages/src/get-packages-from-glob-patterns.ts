import type { GlobPatterns } from "./get-packages.types.js";

import fs from "node:fs/promises";
import path from "node:path";

import { browseDirectories } from "./browse-directories.js";
import { patternToRegex } from "./pattern-to-regex.js";

/**
 * Gets the packages from the given glob patterns.
 * @param globPatterns - The glob patterns to use.
 * @param cwd - The current working directory.
 * @return An array of package paths whose directory contains a `package.json` file.
 */
export const getPackagesFromGlobPatterns = async (
  globPatterns: GlobPatterns,
  cwd: string
): Promise<string[]> => {
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
        return path.relative(cwd, directory);
      } catch {
        return "";
      }
    }
    return "";
  });
  return (await Promise.all(directories)).filter(Boolean);
};
