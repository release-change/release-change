export type ReleaseType = "major" | "minor" | "patch" | null;
export type PackageReleaseType = {
  name: string;
  releaseType: ReleaseType;
};
