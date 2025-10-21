import type { Dirent } from "node:fs";

import fs from "node:fs/promises";

import { expect, it, vi } from "vitest";

import { browseDirectories } from "../src/browse-directories.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";

const mockedDirent: Omit<Dirent, "isDirectory" | "name" | "parentPath" | "path"> = {
  isBlockDevice() {
    return false;
  },
  isCharacterDevice() {
    return false;
  },
  isFIFO() {
    return false;
  },
  isFile() {
    return false;
  },
  isSocket() {
    return false;
  },
  isSymbolicLink() {
    return false;
  }
};

it("should return an empty array if the directory is empty", async () => {
  vi.spyOn(fs, "readdir").mockResolvedValue([]);
  expect(await browseDirectories(mockedCwd)).toStrictEqual([]);
});
it("should browse directories recursively", async () => {
  vi.spyOn(fs, "readdir").mockImplementation(
    async (dirPath): Promise<Dirent<Buffer<ArrayBuffer>>[]> => {
      if (dirPath === mockedCwd) {
        return [
          {
            ...mockedDirent,
            name: "directory1" as unknown as Buffer<ArrayBuffer>,
            isDirectory: () => true,
            parentPath: mockedCwd,
            path: "/fake/cwd/directory1"
          },
          {
            ...mockedDirent,
            name: "directory2" as unknown as Buffer<ArrayBuffer>,
            isDirectory: () => true,
            parentPath: mockedCwd,
            path: "/fake/cwd/directory2"
          }
        ];
      }
      if (dirPath === "/fake/cwd/directory1") {
        return [
          {
            ...mockedDirent,
            name: "subdirectory1" as unknown as Buffer<ArrayBuffer>,
            isDirectory: () => true,
            parentPath: "/fake/cwd/directory1",
            path: "/fake/cwd/directory1/subdirectory1"
          }
        ];
      }
      if (dirPath === "/fake/cwd/directory2") {
        return [
          {
            ...mockedDirent,
            name: "subdirectory2" as unknown as Buffer<ArrayBuffer>,
            isDirectory: () => true,
            parentPath: "/fake/cwd/directory2",
            path: "/fake/cwd/directory2/subdirectory2"
          }
        ];
      }
      return [];
    }
  );
  expect(await browseDirectories(mockedCwd)).toStrictEqual([
    "/fake/cwd/directory1",
    "/fake/cwd/directory1/subdirectory1",
    "/fake/cwd/directory2",
    "/fake/cwd/directory2/subdirectory2"
  ]);
});
