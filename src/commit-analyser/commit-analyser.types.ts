export type Commit = {
  description: string;
  footer: string[];
};
export type ReleaseType = "major" | "minor" | "patch" | null;
