import fs from "node:fs/promises";

import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { browseDirectories } from "../src/browse-directories.js";
import { getPackageName } from "../src/get-package-name.js";
import { getPackagesFromGlobPatterns } from "../src/get-packages-from-glob-patterns.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";

beforeEach(() => {
  vi.mock("../src/browse-directories.js", () => ({ browseDirectories: vi.fn() }));
  vi.mock("../src/get-package-name.js", () => ({ getPackageName: vi.fn() }));
  vi.spyOn(fs, "access").mockResolvedValue(undefined);
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should filter directories according to including glob patterns", async () => {
  const mockedGlobPatterns = { include: ["directory1/*"], exclude: ["**/node_modules/**"] };
  vi.mocked(browseDirectories).mockResolvedValue([
    `${mockedCwd}/directory1/subdirectory1`,
    `${mockedCwd}/directory2/subdirectory2`
  ]);
  vi.mocked(getPackageName).mockReturnValue("@monorepo/subdirectory1");
  expect(await getPackagesFromGlobPatterns(mockedGlobPatterns, mockedCwd)).toStrictEqual([
    { name: "@monorepo/subdirectory1", pathname: "directory1/subdirectory1" }
  ]);
});
it("should exclude directories according to excluding glob patterns", async () => {
  const mockedGlobPatterns = {
    include: ["**/*"],
    exclude: ["**/node_modules/**", "directory1/*"]
  };
  vi.mocked(browseDirectories).mockResolvedValue([
    `${mockedCwd}/directory1/subdirectory1`,
    `${mockedCwd}/directory2/subdirectory2`,
    `${mockedCwd}/node_modules/package`
  ]);
  vi.mocked(getPackageName).mockReturnValue("@monorepo/subdirectory2");
  expect(await getPackagesFromGlobPatterns(mockedGlobPatterns, mockedCwd)).toStrictEqual([
    { name: "@monorepo/subdirectory2", pathname: "directory2/subdirectory2" }
  ]);
});
it("should only return directories with package.json", async () => {
  const mockedGlobPatterns = { include: ["**/*"], exclude: ["**/node_modules/**"] };
  vi.mocked(browseDirectories).mockResolvedValue([
    `${mockedCwd}/with-package`,
    `${mockedCwd}/without-package`
  ]);
  vi.mocked(getPackageName).mockReturnValue("@monorepo/with-package");
  vi.spyOn(fs, "access").mockImplementation(filePath => {
    if (filePath.toString().includes("with-package")) return Promise.resolve(undefined);
    return Promise.reject(new Error("ENOENT: no such file"));
  });
  expect(await getPackagesFromGlobPatterns(mockedGlobPatterns, mockedCwd)).toStrictEqual([
    { name: "@monorepo/with-package", pathname: "with-package" }
  ]);
});
it("should return an empty array when no directories match", async () => {
  const mockedGlobPatterns = { include: ["nonexistent/*"], exclude: [] };
  vi.mocked(browseDirectories).mockResolvedValue([
    `${mockedCwd}/directory1/subdirectory1`,
    `${mockedCwd}/directory2/subdirectory2`
  ]);
  expect(await getPackagesFromGlobPatterns(mockedGlobPatterns, mockedCwd)).toStrictEqual([]);
});
