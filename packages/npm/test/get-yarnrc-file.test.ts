import fs from "node:fs";

import { expect, it, vi } from "vitest";

import { getYarnrcFile } from "../src/get-yarnrc-file.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";

const mockedFile = `npmAuthToken: "\${NPM_TOKEN}"`;

it("should return `null` when no `.yarnrc.yml` file is found", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(false);
  expect(getYarnrcFile(mockedCwd)).toBe(null);
});
it("should return the `.yarnrc.yml` file content", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
  vi.spyOn(fs, "readFileSync").mockReturnValue(mockedFile);
  expect(getYarnrcFile(mockedCwd)).toEqual(mockedFile);
});
