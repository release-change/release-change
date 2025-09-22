import type { NextRelease } from "@release-change/shared";

export const mockedNextReleases: NextRelease = [
  {
    name: "",
    path: ".",
    gitTag: "v1.0.0",
    version: "1.0.0"
  },
  {
    name: "@monorepo/a",
    path: "packages/a",
    gitTag: "@monorepo/a@v1.0.0",
    version: "1.0.0"
  },
  {
    name: "",
    path: ".",
    gitTag: "v1.0.0-alpha.1",
    version: "1.0.0-alpha.1",
    npmTag: "alpha"
  },
  {
    name: "@monorepo/a",
    path: "packages/a",
    gitTag: "@monorepo/a@v1.0.0-alpha.1",
    version: "1.0.0-alpha.1",
    npmTag: "alpha"
  }
];
