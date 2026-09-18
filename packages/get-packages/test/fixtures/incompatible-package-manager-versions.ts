import type { PackageManager } from "../../src/index.js";

export const incompatiblePackageManagerVersions: {
  packageManager: NonNullable<PackageManager>;
  versions: string[];
}[] = [
  {
    packageManager: "npm",
    versions: ["10.8.2", "10.9.0-rc.1"]
  },
  {
    packageManager: "pnpm",
    versions: ["11.0.0-rc.1", "11.1.2"]
  }
];
