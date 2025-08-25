import fs from "node:fs/promises";
import path from "node:path";

/**
 *Browses the directories recursively from the given directory.
 * @param directory - The directory from which to start the browsing.
 * @return An array of all the directories found recursively.
 */
export const browseDirectories = async (directory: string): Promise<string[]> => {
  const entries = (await fs.readdir(directory, { withFileTypes: true })).map(async entry => {
    const pathToEntry = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      const subDirectories = await browseDirectories(pathToEntry);
      return [pathToEntry, ...subDirectories];
    }
    return [];
  });
  const directories = await Promise.all(entries);
  return directories.flat();
};
