export const LOCK_FILE_NAME = {
  npm: "package-lock.json",
  pnpm: "pnpm-lock.yaml",
  yarn: "yarn.lock"
} as const;
export const ARGS = {
  npm: ["install", "--package-lock-only", "--ignore-scripts"],
  pnpm: ["install", "--lockfile-only"],
  yarn: ["install", "--mode=update-lockfile", "--no-immutable"]
} as const;
