import type { PackageManager } from "@release-change/get-packages";

export type PackagePublishing = {
  name: string;
  packageManifestName: string;
  pathname: string;
  version: string;
  packageManager: NonNullable<PackageManager>;
  args: string[];
  npmTag?: string;
};
