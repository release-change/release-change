import { afterEach, assert, beforeEach, describe, expect, it, vi } from "vitest";

import { getPackagesFromGlobPatterns } from "../src/get-packages-from-glob-patterns.js";
import {
  getNpmGlobPatterns,
  getPackageManager,
  getPackages,
  getPnpmGlobPatterns,
  getRootPackageManifest,
  getRootPnpmWorkspaceManifest
} from "../src/index.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";
import { npmPackages } from "./fixtures/npm-packages.js";
import { pnpmPackages } from "./fixtures/pnpm-packages.js";

const mockedContextBase = {
  cwd: mockedCwd,
  env: {},
  config: { debug: false },
  errors: []
};
const expectedSinglePackage = [{ name: "", pathname: "." }];

beforeEach(() => {
  vi.mock("../src/get-package-manager.js", () => ({ getPackageManager: vi.fn() }));
  vi.mock("../src/get-root-package-manifest.js", () => ({ getRootPackageManifest: vi.fn() }));
  vi.mock("../src/get-root-pnpm-workspace-manifest.js", () => ({
    getRootPnpmWorkspaceManifest: vi.fn()
  }));
  vi.mock("../src/get-npm-glob-patterns.js", () => ({ getNpmGlobPatterns: vi.fn() }));
  vi.mock("../src/get-pnpm-glob-patterns.js", () => ({ getPnpmGlobPatterns: vi.fn() }));
  vi.mock("../src/get-packages-from-glob-patterns.js", () => ({
    getPackagesFromGlobPatterns: vi.fn()
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if the package manager is not found or supported", async () => {
  vi.mocked(getPackageManager).mockReturnValue(null);
  await expect(getPackages(mockedContextBase)).rejects.toThrow(
    "Failed to get the package manager: it must be either `npm` or `pnpm`."
  );
});
it("should throw an error if the package manager is npm and no `package.json` file is found at the root", async () => {
  const expectedError = new Error(
    "Failed to get the root package manifest (`package.json`): file not found."
  );
  vi.mocked(getPackageManager).mockReturnValue("npm");
  vi.mocked(getRootPackageManifest).mockImplementation(() => {
    throw expectedError;
  });
  assert.throws(() => getRootPackageManifest(`${mockedCwd}/package.json`));
  await expect(getPackages(mockedContextBase)).rejects.toThrow();
  assert.deepNestedInclude(mockedContextBase.errors, expectedError);
});
it("should throw an error if the package manager is pnpm and the glob patterns do not return anything", async () => {
  const expectedError = new Error(
    "Failed to get the glob patterns: the root `pnpm-workspace.yaml` file must have a `packages` field."
  );
  vi.mocked(getPackageManager).mockReturnValue("pnpm");
  vi.mocked(getRootPnpmWorkspaceManifest).mockReturnValue("no-packages:");
  vi.mocked(getPnpmGlobPatterns).mockImplementation(() => {
    throw expectedError;
  });
  await expect(getPackages(mockedContextBase)).rejects.toThrow();
  assert.deepNestedInclude(mockedContextBase.errors, expectedError);
});
it("should return one single package when the package manager is npm and the glob patterns do not return anything", async () => {
  vi.mocked(getPackageManager).mockReturnValue("npm");
  vi.mocked(getRootPackageManifest).mockReturnValue({ name: "my-package", version: "1.0.0" });
  vi.mocked(getNpmGlobPatterns).mockReturnValue(null);
  assert.deepEqual(await getPackages(mockedContextBase), expectedSinglePackage);
});
describe.each(npmPackages)("when the package manager is npm", ({ content, patterns, packages }) => {
  it("should return one single package when the glob patterns return an empty array of packages", async () => {
    vi.mocked(getPackageManager).mockReturnValue("npm");
    vi.mocked(getRootPackageManifest).mockReturnValue(content);
    vi.mocked(getNpmGlobPatterns).mockReturnValue(patterns);
    vi.mocked(getPackagesFromGlobPatterns).mockResolvedValue([]);
    assert.deepEqual(await getPackages(mockedContextBase), expectedSinglePackage);
  });
  it("should return the correct packages when the glob patterns return packages", async () => {
    vi.mocked(getPackageManager).mockReturnValue("npm");
    vi.mocked(getRootPackageManifest).mockReturnValue(content);
    vi.mocked(getNpmGlobPatterns).mockReturnValue(patterns);
    vi.mocked(getPackagesFromGlobPatterns).mockResolvedValue(packages);
    assert.deepEqual(await getPackages(mockedContextBase), [...expectedSinglePackage, ...packages]);
  });
});
it("should return one single package when the package manager is pnpm and no `pnpm-workspace.yaml` file is found at the root", async () => {
  vi.mocked(getPackageManager).mockReturnValue("pnpm");
  vi.mocked(getRootPnpmWorkspaceManifest).mockReturnValue(null);
  assert.deepEqual(await getPackages(mockedContextBase), expectedSinglePackage);
});
describe.each(pnpmPackages)(
  "when the package manager is pnpm",
  ({ content, patterns, packages }) => {
    it("should return one single package when the glob patterns return an empty array of packages", async () => {
      vi.mocked(getPackageManager).mockReturnValue("npm");
      vi.mocked(getRootPnpmWorkspaceManifest).mockReturnValue(content);
      vi.mocked(getPnpmGlobPatterns).mockReturnValue(patterns);
      vi.mocked(getPackagesFromGlobPatterns).mockResolvedValue([]);
      assert.deepEqual(await getPackages(mockedContextBase), expectedSinglePackage);
    });
    it("should return the correct packages when the glob patterns return packages", async () => {
      vi.mocked(getPackageManager).mockReturnValue("npm");
      vi.mocked(getRootPnpmWorkspaceManifest).mockReturnValue(content);
      vi.mocked(getPnpmGlobPatterns).mockReturnValue(patterns);
      vi.mocked(getPackagesFromGlobPatterns).mockResolvedValue(packages);
      assert.deepEqual(await getPackages(mockedContextBase), [
        ...expectedSinglePackage,
        ...packages
      ]);
    });
  }
);
