export type Commit = {
  sha: string | null;
  description: string;
  body: string[];
  footer: string[];
  modifiedFiles?: string[];
};
export type ReleaseType = "major" | "minor" | "patch" | null;
export type PackageReleaseType = {
  name: string;
  releaseType: ReleaseType;
};
