import fs from "node:fs";

import { describe, expect, it, vi } from "vitest";

import { getConfigFile } from "../src/get-config-file.js";

describe("get config file", () => {
  const mockedConfigFile = {
    branches: ["main"]
  };

  it("should return `null` when no config file is found", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    expect(getConfigFile()).toBe(null);
  });
  it("should return the config file content", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(mockedConfigFile));
    expect(getConfigFile()).toEqual(mockedConfigFile);
  });
});
