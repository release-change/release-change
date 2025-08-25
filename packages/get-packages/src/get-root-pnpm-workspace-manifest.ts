import fs from "node:fs";

/**
 * Gets the content of the root workspace manifest (aka `pnpm-workspace.yaml`).
 * @param path - The path to the root workspace file.
 * @return The content of the root `pnpm-workspace.yaml` if the file is found, `null` otherwise.
 */
export const getRootPnpmWorkspaceManifest = (path: string): string | null => {
  return fs.existsSync(path) ? fs.readFileSync(path, "utf8") : null;
};
