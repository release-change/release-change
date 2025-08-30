export type Commit = {
  description: string;
  footer: string[];
  modifiedFiles?: string[];
};
export type ReleaseType = "major" | "minor" | "patch" | null;
export type PackageReleaseType = {
  name: string;
  releaseType: ReleaseType;
};
