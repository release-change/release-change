import { describe, expect, it, vi } from "vitest";

import { isPackageManagerVersionCompatible } from "../src/is-package-manager-version-compatible.js";
import { compatiblePackageManagerVersions } from "./fixtures/compatible-package-manager-versions.js";
import { incompatiblePackageManagerVersions } from "./fixtures/incompatible-package-manager-versions.js";
import { invalidPackageManagerVersions } from "./fixtures/invalid-package-manager-versions.js";
import { packageManagers } from "./fixtures/package-managers.js";

vi.mock("../src/constants.js", () => ({
  REQUIRED_NPM_VERSION: ">=10.9.0",
  REQUIRED_PNPM_VERSION: ">=11.1.3"
}));

describe.each(invalidPackageManagerVersions)("for %s", invalidPackageManagerVersion => {
  it.each(packageManagers)(
    "should return `false` if the version is an output not displaying a version",
    packageManager => {
      expect(isPackageManagerVersionCompatible(packageManager, invalidPackageManagerVersion)).toBe(
        false
      );
    }
  );
});
describe.each(incompatiblePackageManagerVersions)(
  "for $packageManager",
  ({ packageManager, versions }) => {
    it.each(versions)("should return `false` if the version is %s", version => {
      expect(isPackageManagerVersionCompatible(packageManager, version)).toBe(false);
    });
  }
);
describe.each(compatiblePackageManagerVersions)(
  "for $packageManager",
  ({ packageManager, versions }) => {
    it.each(versions)("should return `true` if the version is %s", version => {
      expect(isPackageManagerVersionCompatible(packageManager, version)).toBe(true);
    });
  }
);
