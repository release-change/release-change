export type ReleaseNotes = {
  tagName: string;
  target: string;
  isPrerelease: boolean;
  body: {
    major?: string[];
    minor?: string[];
    patch?: string[];
    dependencies?: string[];
    changelog?: string;
  };
};
