import type { PackageManager } from "../../src/index.js";

export const compatiblePackageManagerVersions: {
  packageManager: NonNullable<PackageManager>;
  versions: string[];
}[] = [
  {
    packageManager: "npm",
    versions: ["10.9.0", "10.9.8", "11.3.0", "11.19.0"]
  },
  {
    packageManager: "pnpm",
    versions: ["11.1.3", "12.0.0-rc.1", "12.0.0", "12.4.2"]
  }
];
