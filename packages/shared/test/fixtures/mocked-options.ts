import type { SpawnSyncOptions } from "node:child_process";

export const mockedOptions = {
  cwd: "/fake/path"
};
export const mockedOptionsSync: SpawnSyncOptions = {
  cwd: "/fake/path",
  encoding: "utf8"
};
