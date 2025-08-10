import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getRepositoryUrl } from "../src/get-repository-url.js";
import { getRootPackage } from "../src/index.js";

describe("get repository URL", () => {
  const mockedPackageWithRepositoryAsObject = {
    repository: {
      type: "git",
      url: "git+https://github.com/user-id/repo-name.git"
    }
  };
  const mockedPackageWithRepositoryAsString = {
    repository: "https://github.com/user-id/repo-name.git"
  };
  const expectedUrlFromRepositoryAsObject = "https://github.com/user-id/repo-name.git";
  const expectedUrlFromRepositoryAsString = "https://github.com/user-id/repo-name.git";

  beforeEach(() => {
    vi.mock("../src/get-root-package.js", () => ({
      getRootPackage: vi.fn()
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return `null` when no package found", () => {
    vi.mocked(getRootPackage).mockReturnValue(null);
    expect(getRepositoryUrl()).toBe(null);
  });
  it("should return the value of the `repository.url` property when the package file is found", () => {
    vi.mocked(getRootPackage).mockReturnValue(mockedPackageWithRepositoryAsObject);
    expect(getRepositoryUrl()).toBe(expectedUrlFromRepositoryAsObject);
  });
  it("should return the value of the `repository` property if it is a string", () => {
    vi.mocked(getRootPackage).mockReturnValue(mockedPackageWithRepositoryAsString);
    expect(getRepositoryUrl()).toBe(expectedUrlFromRepositoryAsString);
  });
});
