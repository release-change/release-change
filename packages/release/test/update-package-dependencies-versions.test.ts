import fs from "node:fs";

import { setLogger } from "@release-change/logger";
import { afterEach, assert, beforeEach, describe, expect, it, vi } from "vitest";

import { updatePackageDependenciesVersions } from "../src/update-package-dependencies-versions.js";
import { mockedConfig } from "./fixtures/mocked-config.js";
import { mockedContextInMonorepo } from "./fixtures/mocked-context.js";
import { mockedContext } from "./fixtures/mocked-context-update.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedNextReleasesWithDependencies } from "./fixtures/mocked-next-releases-with-dependencies-update.js";

beforeEach(() => {
  vi.mock("node:fs");
  vi.mock("@release-change/logger", () => ({
    setLogger: vi.fn()
  }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
});
afterEach(() => {
  vi.clearAllMocks();
});

describe.each(mockedNextReleasesWithDependencies)(
  "for $packageName (update method: $dependencyUpdateMethod)",
  ({
    packageName,
    packageManifestPath,
    nextRelease,
    dependencyUpdateMethod,
    dependencies,
    expectedDependenciesUpdates,
    packageManifest,
    expectedPackageManifest
  }) => {
    it("should throw an error if `dependencyUpdateMethod` is not defined", () => {
      assert.throws(
        () => updatePackageDependenciesVersions(nextRelease, [], mockedContext),
        "Dependency update method not found."
      );
    });
    it("should throw an error if the package manifest is not found", () => {
      vi.spyOn(fs, "existsSync").mockReturnValue(false);
      assert.throws(
        () =>
          updatePackageDependenciesVersions(nextRelease, [], {
            ...mockedContextInMonorepo,
            config: { ...mockedConfig, dependencyUpdateMethod: "pin" }
          }),
        `Package ${packageManifestPath} not found for ${packageName}.`
      );
    });
    it("should update the package dependencies versions", () => {
      const readFileSpy = vi
        .spyOn(fs, "readFileSync")
        .mockReturnValue(JSON.stringify(packageManifest));
      updatePackageDependenciesVersions(nextRelease, dependencies, {
        ...mockedContextInMonorepo,
        config: { ...mockedConfig, dependencyUpdateMethod }
      });
      expect(readFileSpy).toHaveBeenCalledWith(packageManifestPath, "utf-8");
      for (const dependency of dependencies) {
        const { name } = dependency;
        const expectedVersion =
          expectedDependenciesUpdates.find(
            expectedDependencyUpdate => expectedDependencyUpdate.name === name
          )?.version ?? null;
        const expectedRange =
          dependencyUpdateMethod === "caret-range"
            ? "^"
            : dependencyUpdateMethod === "tilde-range"
              ? "~"
              : "";
        const { dependencies, devDependencies } = expectedPackageManifest;
        if (dependencies && expectedPackageManifest.dependencies && name in dependencies) {
          expect(expectedPackageManifest.dependencies[name]).toBe(expectedRange + expectedVersion);
        } else if (
          devDependencies &&
          expectedPackageManifest.devDependencies &&
          name in devDependencies
        ) {
          expect(expectedPackageManifest.devDependencies[name]).toBe(
            expectedRange + expectedVersion
          );
        }
        expect(mockedLogger.logInfo).toHaveBeenCalledWith(
          `Package version updated to ${expectedVersion} for package dependency ${name}.`
        );
      }
      // TODO: uncomment when updated package manifest content is written to file
      // expect(fs.writeFileSync).toHaveBeenCalledWith(
      //   packageManifestPath,
      //   JSON.stringify(expectedPackageManifest, null, 2)
      // );
    });
  }
);
