import fs from "node:fs";

import { expect, it, vi } from "vitest";

import { getRootPnpmWorkspaceManifest } from "../src/index.js";
import { mockedPnpmWorkspacePath } from "./fixtures/mocked-paths.js";

const mockedContent = `packages:
  - 'packages/*'

catalog:
  chalk: ^4.1.2

catalogs:
  react16:
    react: ^16.7.0
    react-dom: ^16.7.0
  react17:
    react: ^17.10.0
    react-dom: ^17.10.0`;

it("should return `null` when no root package manifest is found", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(false);
  expect(getRootPnpmWorkspaceManifest(mockedPnpmWorkspacePath)).toBe(null);
});
it("should return the content of the package when found", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
  vi.spyOn(fs, "readFileSync").mockReturnValue(mockedContent);
  expect(getRootPnpmWorkspaceManifest(mockedPnpmWorkspacePath)).toEqual(mockedContent);
});
