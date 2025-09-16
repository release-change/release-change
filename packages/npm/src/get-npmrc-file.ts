import fs from "node:fs";
import path from "node:path";

/**
 * Gets the `.npmrc` file.
 * @param cwd - The current working directory.
 * @return The content of the file if it exists, `null` otherwise.
 */
export const getNpmrcFile = (cwd: string): string | null => {
  const pathToFile = path.join(cwd, ".npmrc");
  return fs.existsSync(pathToFile) ? fs.readFileSync(pathToFile, "utf8") : null;
};
