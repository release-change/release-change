import type { Context } from "@release-change/shared";

import fs from "node:fs";

import { setLogger } from "@release-change/logger";
import { runCommand } from "@release-change/shared";
import { afterEach, assert, beforeEach, describe, expect, it, vi } from "vitest";

import { getAuthToken } from "../src/get-auth-token.js";
import { getNpmrcFile } from "../src/get-npmrc-file.js";
import { publishToRegistry } from "../src/index.js";
import { removeAuthToken } from "../src/remove-auth-token.js";
import { setAuthToken } from "../src/set-auth-token.js";
import { mockedContext, mockedContextWithAuthToken } from "./fixtures/mocked-context.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedPackagePublishingSet } from "./fixtures/mocked-package-publishing-set.js";

// biome-ignore lint/suspicious/noTemplateCurlyInString: <literal `${}`>
const mockedNpmrcFile = "//registry.npmjs.org/:_authToken=${NPM_TOKEN}";

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({
    runCommand: vi.fn(),
    WORKSPACE_NAME: "release-change"
  }));
  vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
  vi.mock("../src/get-auth-token.js", () => ({ getAuthToken: vi.fn() }));
  vi.mock("../src/get-npmrc-file.js", () => ({ getNpmrcFile: vi.fn() }));
  vi.mock("../src/set-auth-token.js", () => ({ setAuthToken: vi.fn() }));
  vi.mock("../src/remove-auth-token.js", () => ({ removeAuthToken: vi.fn() }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
  vi.mocked(getAuthToken).mockImplementation(() => undefined);
  vi.spyOn(fs, "writeFileSync").mockImplementation(() => undefined);
  vi.spyOn(fs, "rmSync").mockImplementation(() => undefined);
});
afterEach(() => {
  vi.clearAllMocks();
});

describe.each(mockedPackagePublishingSet)(
  "for package $name and version $version",
  packagePublishing => {
    const { name, packageManifestName, pathname, version, packageManager, args, npmTag } =
      packagePublishing;
    const packageName = name || "root";
    const mockedCwd = pathname === "." ? mockedContext.cwd : `${mockedContext.cwd}/${pathname}`;
    const mockedOptions = {
      cwd: mockedCwd,
      env: mockedContext.env
    };
    it("should throw an error if the auth token is not defined", async () => {
      await expect(publishToRegistry(packagePublishing, mockedContext)).rejects.toThrowError(
        "Failed to load the auth token context."
      );
    });
    it("should not call `setAuthToken()` nor `removeAuthToken()` when the `.npmrc` file already exists and sets auth token", async () => {
      vi.mocked(getNpmrcFile).mockReturnValue(mockedNpmrcFile);
      vi.mocked(runCommand).mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      const mockedSetAuthToken = vi.mocked(setAuthToken).mockImplementation(() => undefined);
      const mockedRemoveAuthToken = vi.mocked(removeAuthToken).mockImplementation(() => undefined);
      await publishToRegistry(packagePublishing, mockedContextWithAuthToken);
      expect(mockedSetAuthToken).not.toHaveBeenCalled();
      expect(mockedRemoveAuthToken).not.toHaveBeenCalled();
    });
    it("should call `setAuthToken()` and `removeAuthToken()` when the `.npmrc` file does not exist", async () => {
      vi.mocked(getNpmrcFile).mockReturnValue(null);
      vi.mocked(runCommand).mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      const mockedSetAuthToken = vi.mocked(setAuthToken).mockImplementation(() => undefined);
      const mockedRemoveAuthToken = vi.mocked(removeAuthToken).mockImplementation(() => undefined);
      await publishToRegistry(packagePublishing, {
        ...mockedContext,
        authToken: {
          fileExists: false,
          authTokenExists: false
        }
      });
      expect(mockedSetAuthToken).toHaveBeenCalled();
      expect(mockedRemoveAuthToken).toHaveBeenCalled();
    });
    it("should call `setAuthToken()` and `removeAuthToken()` when the `.npmrc` file does not set auth token", async () => {
      vi.mocked(getNpmrcFile).mockReturnValue(null);
      vi.mocked(runCommand).mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      const mockedSetAuthToken = vi.mocked(setAuthToken).mockImplementation(() => undefined);
      const mockedRemoveAuthToken = vi.mocked(removeAuthToken).mockImplementation(() => undefined);
      await publishToRegistry(packagePublishing, {
        ...mockedContext,
        authToken: {
          fileExists: true,
          authTokenExists: false
        }
      });
      expect(mockedSetAuthToken).toHaveBeenCalled();
      expect(mockedRemoveAuthToken).toHaveBeenCalled();
    });
    it("should log an error message if the publish command fails", async () => {
      const mockedCommand = vi
        .mocked(runCommand)
        .mockResolvedValue({ status: 128, stdout: "", stderr: "Some error message." });
      vi.mocked(getNpmrcFile).mockReturnValue(mockedNpmrcFile);
      await expect(
        publishToRegistry(packagePublishing, mockedContextWithAuthToken)
      ).rejects.toThrowError("Some error message.");
      expect(mockedCommand).toHaveBeenCalledWith(packageManager, args, mockedOptions);
      expect(mockedLogger.logError).toHaveBeenCalledWith(
        `Failed to publish release ${version} of ${packageName} package to the NPM registry.`
      );
    });
    it(`should run the \`${packageManager} publish\` command with the appropriate flags`, async () => {
      const context: Context = mockedContextWithAuthToken;
      const mockedCommand = vi
        .mocked(runCommand)
        .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
      vi.mocked(getNpmrcFile).mockReturnValue(mockedNpmrcFile);
      await publishToRegistry(packagePublishing, context);
      expect(mockedCommand).toHaveBeenCalledWith(packageManager, args, mockedOptions);
      expect(mockedLogger.logSuccess).toHaveBeenCalledWith(
        `Published release ${version} of ${packageName} package to the NPM registry on ${
          npmTag || "default"
        } channel.`
      );
      assert.deepNestedInclude(context.releaseInfos, {
        type: "npm",
        name: `NPM (${npmTag ?? "latest"} distribution tag)`,
        url: `https://www.npmjs.com/package/${packageManifestName}/v/${version}`
      });
    });
  }
);
