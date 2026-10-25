import type { PackageManager } from "@release-change/get-packages";

import { describe, expect, it } from "vitest";

import { getLockFilePath } from "../src/get-lock-file-path.js";

const mockedCwd = "/fake-path";
const pathnames = [".", "packages/a", "packages/b"];
const packageManagers: [NonNullable<PackageManager>, string][] = [
  ["npm", "package-lock.json"],
  ["pnpm", "pnpm-lock.yaml"],
  ["yarn", "yarn.lock"]
];
describe.each(pathnames)("with pathname %s", pathname => {
  it.each(packageManagers)(
    "should return a path ending with `$1` for `$0`",
    (packageManager, expectedLockFileName) => {
      const expectedPath =
        pathname === "."
          ? `${mockedCwd}/${expectedLockFileName}`
          : `${mockedCwd}/${pathname}/${expectedLockFileName}`;
      expect(getLockFilePath(mockedCwd, pathname, packageManager)).toBe(expectedPath);
    }
  );
});
