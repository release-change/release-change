export type PackageManifest = {
  name?: string;
  version?: string;
  private?: boolean;
  repository?:
    | string
    | {
        type: string;
        url: string;
        directory?: string;
      };
  workspaces?: string[];
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};
