export type SemverOptionsLoose = {
  loose?: boolean;
};
export type SemverOptionsIncludePrerelease = {
  includePrerelease?: boolean;
};
export type SemverOptionsRtl = {
  rtl?: boolean;
};
export type SemverOptions = SemverOptionsLoose & SemverOptionsIncludePrerelease & SemverOptionsRtl;
export type SemverPrerelease = ReadonlyArray<string | number>;
export type SemverIdentifierBase = "0" | "1" | 0 | 1 | false;
export type SemverPrereleaseIdentifiers = {
  prefix?: string;
  identifierBase?: SemverIdentifierBase;
};
export type SemverBuild = ReadonlyArray<string>;
export type SemverData = {
  raw: string;
  version: string;
  major: number;
  minor: number;
  patch: number;
  prerelease: SemverPrerelease;
  build: SemverBuild;
};
export type SemverVersionComponents = {
  major: number;
  minor: number;
  patch: number;
  prerelease: SemverPrerelease;
  build: SemverBuild;
};
export type SemverReleaseType =
  | "major"
  | "minor"
  | "patch"
  | "release"
  | "premajor"
  | "preminor"
  | "prepatch"
  | "prerelease";
export type SemverOperator = "===" | "!==" | "" | "=" | "==" | "!=" | ">" | ">=" | "<" | "<=";
export type SemverComparatorOperator = "" | "=" | ">" | ">=" | "<" | "<=";
export type SemverHighLowDirection = ">" | "<";
export interface SemverComparatorData {
  operator: SemverComparatorOperator;
  semver: SemverData;
  value: string;
}
export interface SemverRangeData {
  raw: string;
  range: string;
  includePrerelease: boolean;
  set: SemverComparatorData[][];
  options: SemverOptionsLoose & SemverOptionsIncludePrerelease;
}
