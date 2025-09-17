import fs from "node:fs";

import { expect, it, vi } from "vitest";

import { getNpmrcFile } from "../src/get-npmrc-file.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";

// biome-ignore lint/suspicious/noTemplateCurlyInString: <literal `${}`>
const mockedFile = "//registry.npmjs.org/:_authToken=${NPM_TOKEN}";

it("should return `null` when no `.npmrc` file is found", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(false);
  expect(getNpmrcFile(mockedCwd)).toBe(null);
});
it("should return the `.npmrc` file content", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
  vi.spyOn(fs, "readFileSync").mockReturnValue(mockedFile);
  expect(getNpmrcFile(mockedCwd)).toEqual(mockedFile);
});
