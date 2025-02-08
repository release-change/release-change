const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
] as const;
type Letter = (typeof letters)[number];
type Alias = `-${Lowercase<Letter> | Uppercase<Letter>}`;
type Flag = `--${string}`;
export type CliOptionCommand = Alias | Flag;
export type Args = (Alias | Flag | string)[];
export type ParsedCliOptions = {
  branches?: string[];
  repositoryUrl?: string;
  debug?: true;
  dryRun?: true;
  version?: true;
  help?: true;
};
export type CliOptions = Omit<ParsedCliOptions, "help" | "version">;
