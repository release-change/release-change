export type PackageManager = "npm" | "pnpm" | "yarn" | null;
export type GlobPatterns = {
  include: string[];
  exclude: string[];
};
