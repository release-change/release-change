export type PackageManager = "npm" | "pnpm" | null;
export type GlobPatterns = {
  include: string[];
  exclude: string[];
};
