import { getRootPackage } from "@release-change/config";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getRootPackageVersion } from "../../src/release/get-root-package-version.js";

describe("get root package version", () => {
  const mockedCwd = "/fake/path";
  const mockedRootPackageWithVersion = {
    version: "1.0.0"
  };
  const expectedVersion = "1.0.0";

  beforeEach(() => {
    vi.mock("@release-change/config", () => ({
      getRootPackage: vi.fn()
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return `undefined` when no package found", () => {
    vi.mocked(getRootPackage).mockReturnValue(null);
    expect(getRootPackageVersion(mockedCwd)).toBe(undefined);
  });
  it("should return `undefined` when the package file is found, but does not have the `version` property", () => {
    vi.mocked(getRootPackage).mockReturnValue({});
    expect(getRootPackageVersion(mockedCwd)).toBe(undefined);
  });
  it("should return the value of the `version` property when the package file is found and has it", () => {
    vi.mocked(getRootPackage).mockReturnValue(mockedRootPackageWithVersion);
    expect(getRootPackageVersion(mockedCwd)).toBe(expectedVersion);
  });
});
