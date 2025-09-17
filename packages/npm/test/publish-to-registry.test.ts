import type { Context } from "@release-change/shared";

import fs from "node:fs";

import { getPackageManager, type PackageManager } from "@release-change/get-packages";
import { setLogger } from "@release-change/logger";
import { runCommand } from "@release-change/shared";
import { afterEach, assert, beforeEach, describe, expect, it, vi } from "vitest";

import { getAuthToken } from "../src/get-auth-token.js";
import { getNpmrcFile } from "../src/get-npmrc-file.js";
import { publishToRegistry } from "../src/index.js";
import { removeAuthToken } from "../src/remove-auth-token.js";
import { setAuthToken } from "../src/set-auth-token.js";
import { mockedConfig } from "./fixtures/mocked-config.js";
import { mockedContext } from "./fixtures/mocked-context.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

const mockedConfigWithNoNpmPublish: Context["config"] = {
  ...mockedConfig,
  npmPublish: false
};
const mockedContextWithNoNpmPublish: Context = {
  ...mockedContext,
  config: mockedConfigWithNoNpmPublish
};
const packageManagers: PackageManager[] = ["npm", "pnpm"];
// biome-ignore lint/suspicious/noTemplateCurlyInString: <literal `${}`>
const mockedNpmrcFile = "//registry.npmjs.org/:_authToken=${NPM_TOKEN}";
const mockedNextReleases: Context["nextRelease"] = [
  {
    name: "",
    path: ".",
    gitTag: "v1.0.0",
    version: "1.0.0"
  },
  {
    name: "@monorepo/a",
    path: "packages/a",
    gitTag: "@monorepo/a@v1.0.0",
    version: "1.0.0"
  },
  {
    name: "",
    path: ".",
    gitTag: "v1.0.0-alpha.1",
    version: "1.0.0-alpha.1",
    npmTag: "alpha"
  },
  {
    name: "@monorepo/a",
    path: "packages/a",
    gitTag: "@monorepo/a@v1.0.0-alpha.1",
    version: "1.0.0-alpha.1",
    npmTag: "alpha"
  }
];

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({
    runCommand: vi.fn(),
    WORKSPACE_NAME: "release-change"
  }));
  vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
  vi.mock("@release-change/get-packages", () => ({ getPackageManager: vi.fn() }));
  vi.mock("../src/get-auth-token.js", () => ({ getAuthToken: vi.fn() }));
  vi.mock("../src/get-npmrc-file.js", () => ({ getNpmrcFile: vi.fn() }));
  vi.mock("../src/set-auth-token.js", () => ({ setAuthToken: vi.fn() }));
  vi.mock("../src/remove-auth-token.js", () => ({ removeAuthToken: vi.fn() }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
  vi.mocked(getAuthToken).mockImplementation(() => undefined);
});
afterEach(() => {
  vi.clearAllMocks();
});

describe.each(mockedNextReleases)("for package $name and version $version", nextRelease => {
  const packageManifestContent = {
    name: nextRelease.name || "foo",
    repository: {
      type: "git",
      url: "git+https://github.com/owner/repo.git"
    }
  };
  it("should throw an error if the package cannot be found", async () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    await expect(
      publishToRegistry(nextRelease, {
        ...mockedContext,
        nextRelease: [nextRelease]
      })
    ).rejects.toThrowError("Could not find the package.");
  });
  it("should throw an error if the package manager is not one of those supported", async () => {
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(packageManifestContent));
    vi.mocked(getPackageManager).mockReturnValue(null);
    await expect(
      publishToRegistry(nextRelease, {
        ...mockedContext,
        nextRelease: [nextRelease]
      })
    ).rejects.toThrowError(
      "The package manager is not found or is not one of those supported (npm or pnpm)."
    );
  });
  it("should log a warning if the package cannot be published to NPM because `npmPublish` is set to `false`", async () => {
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(packageManifestContent));
    await publishToRegistry(nextRelease, mockedContextWithNoNpmPublish);
    expect(mockedLogger.logWarn).toHaveBeenCalledWith(
      "The package is private; therefore, the release will not be published."
    );
  });
  it("should log a warning if the package cannot be published to NPM because it has the `private` property set to `true`", async () => {
    vi.spyOn(fs, "readFileSync").mockReturnValue(
      JSON.stringify({ ...packageManifestContent, private: true })
    );
    await publishToRegistry(nextRelease, {
      ...mockedContext,
      nextRelease: [nextRelease]
    });
    expect(mockedLogger.logWarn).toHaveBeenCalledWith(
      "The package is private; therefore, the release will not be published."
    );
  });
  describe.each(packageManagers)("for package manager %s", packageManager => {
    const packageName = nextRelease.name || "root";
    // TODO: remove `--dry-run` flag when releases are truly published to the NPM registry
    const args = ["publish", "--dry-run", "--access", "public"];
    if (nextRelease.npmTag) args.push("--tag", nextRelease.npmTag);
    it("should throw an error if the auth token is not defined", async () => {
      vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(packageManifestContent));
      vi.mocked(getPackageManager).mockReturnValue(packageManager);
      await expect(
        publishToRegistry(nextRelease, {
          ...mockedContext,
          nextRelease: [nextRelease]
        })
      ).rejects.toThrowError("Failed to load the auth token context.");
    });
    it("should not call `setAuthToken()` nor `removeAuthToken()` when the `.npmrc` file already exists and sets auth token", async () => {
      vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(packageManifestContent));
      vi.mocked(getPackageManager).mockReturnValue(packageManager);
      vi.mocked(getNpmrcFile).mockReturnValue(mockedNpmrcFile);
      vi.spyOn(fs, "writeFileSync").mockImplementation(() => undefined);
      vi.spyOn(fs, "rmSync").mockImplementation(() => undefined);
      vi.mocked(runCommand).mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      const mockedSetAuthToken = vi.mocked(setAuthToken).mockImplementation(() => undefined);
      const mockedRemoveAuthToken = vi.mocked(removeAuthToken).mockImplementation(() => undefined);
      await publishToRegistry(nextRelease, {
        ...mockedContext,
        nextRelease: [nextRelease],
        authToken: {
          fileExists: true,
          authTokenExists: true
        }
      });
      expect(mockedSetAuthToken).not.toHaveBeenCalled();
      expect(mockedRemoveAuthToken).not.toHaveBeenCalled();
    });
    it("should log an error message if the publish command fails", async () => {
      vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(packageManifestContent));
      const mockedCommand = vi
        .mocked(runCommand)
        .mockResolvedValue({ status: 128, stdout: "", stderr: "Some error message." });
      vi.mocked(getNpmrcFile).mockReturnValue(mockedNpmrcFile);
      await expect(
        publishToRegistry(nextRelease, {
          ...mockedContext,
          nextRelease: [nextRelease],
          authToken: {
            fileExists: true,
            authTokenExists: true
          }
        })
      ).rejects.toThrowError("Some error message.");
      expect(mockedCommand).toHaveBeenCalledWith(packageManager, args);
      expect(mockedLogger.logError).toHaveBeenCalledWith(
        `Failed to publish release ${nextRelease.version} of ${packageName} package to the NPM registry.`
      );
    });
    it("should run the publish command", async () => {
      const context: Context = {
        ...mockedContext,
        nextRelease: [nextRelease],
        authToken: {
          fileExists: true,
          authTokenExists: true
        }
      };
      vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(packageManifestContent));
      const mockedCommand = vi
        .mocked(runCommand)
        .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      vi.mocked(getNpmrcFile).mockReturnValue(mockedNpmrcFile);
      await publishToRegistry(nextRelease, context);
      expect(mockedCommand).toHaveBeenCalledWith(packageManager, args);
      expect(mockedLogger.logSuccess).toHaveBeenCalledWith(
        `Published release ${nextRelease.version} of ${packageName} package to the NPM registry on ${
          nextRelease.npmTag || "default"
        } channel.`
      );
      assert.deepNestedInclude(context.releaseInfos, {
        type: "npm",
        name: `NPM (${nextRelease.npmTag ?? "latest"} distribution tag)`,
        url: `https://www.npmjs.com/package/${packageManifestContent.name}/v/${nextRelease.version}`
      });
    });
  });
});
