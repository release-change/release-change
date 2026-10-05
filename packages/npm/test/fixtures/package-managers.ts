import type { PackageManager } from "@release-change/get-packages";

export const packageManagers: NonNullable<PackageManager>[] = ["npm", "pnpm", "yarn"];
export const packageManagersNotYarn: NonNullable<PackageManager>[] = ["npm", "pnpm"];
