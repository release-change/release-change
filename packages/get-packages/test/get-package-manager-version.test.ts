import { runCommandSync } from "@release-change/shared";
import { describe, expect, it, vi } from "vitest";

import { getPackageManagerVersion } from "../src/get-package-manager-version.js";
import { invalidPackageManagerVersions } from "./fixtures/invalid-package-manager-versions.js";
import { packageManagers } from "./fixtures/package-managers.js";
import { validPackageManagerVersions } from "./fixtures/valid-package-manager-versions.js";

vi.mock("@release-change/shared", () => ({
  runCommandSync: vi.fn()
}));

describe.each(invalidPackageManagerVersions)("for %s", invalidPackageManagerVersion => {
  it.each(packageManagers)(
    "should return the output if the `%s --version` command does not return a version",
    packageManager => {
      const expectedOutput = invalidPackageManagerVersion.replaceAll(
        "{{packageManager}}",
        packageManager
      );
      vi.mocked(runCommandSync).mockReturnValue({
        status: 0,
        stdout: expectedOutput,
        stderr: ""
      });
      expect(getPackageManagerVersion(packageManager)).toBe(expectedOutput);
    }
  );
});
describe.each(validPackageManagerVersions)("for %s", validPackageManagerVersion => {
  it.each(packageManagers)(
    "should return the version when the `%s --version` command is run",
    packageManager => {
      vi.mocked(runCommandSync).mockReturnValue({
        status: 0,
        stdout: validPackageManagerVersion,
        stderr: ""
      });
      expect(getPackageManagerVersion(packageManager)).toBe(validPackageManagerVersion);
    }
  );
});
