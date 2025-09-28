/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <TODO: drop this line when the file is written> */
/** biome-ignore-all lint/correctness/noUnusedVariables: <TODO: drop this line when the file is written> */
import fs from "node:fs";

import { getPackageName } from "@release-change/get-packages";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createChangelogFile } from "../src/create-changelog-file.js";
import { formatReleaseNotesBody } from "../src/format-release-notes-body.js";
import { updateChangelogFile } from "../src/index.js";
import { mockedChangelogFiles } from "./fixtures/mocked-changelog-files.js";
import { mockedContext } from "./fixtures/mocked-context.js";

beforeEach(() => {
  vi.mock("@release-change/get-packages", () => ({ getPackageName: vi.fn() }));
  vi.mock("../src/create-changelog-file.js", () => ({ createChangelogFile: vi.fn() }));
  vi.mock("../src/format-release-notes-body", () => ({ formatReleaseNotesBody: vi.fn() }));
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
});
afterEach(() => {
  vi.clearAllMocks();
});

describe.each(mockedChangelogFiles)(
  "for $nextRelease.name",
  ({
    nextRelease,
    packageName,
    path,
    releaseNotesBody,
    releaseNotesBodyWithoutChangelog,
    formattedReleaseNotesBody,
    existingChangelogFile,
    expectedUpdatedChangelogFile
  }) => {
    it("should write a new changelog file", () => {
      vi.spyOn(fs, "existsSync").mockReturnValue(false);
      vi.mocked(getPackageName).mockReturnValue(packageName);
      updateChangelogFile(nextRelease, releaseNotesBodyWithoutChangelog, mockedContext.cwd);
      expect(createChangelogFile).toHaveBeenCalledWith(
        path,
        `# ${packageName}\n\n## 1.0.0\n\n`,
        releaseNotesBodyWithoutChangelog
      );
    });
    it("should write a new changelog file if the existing one is empty", () => {
      vi.spyOn(fs, "existsSync").mockReturnValue(true);
      vi.spyOn(fs, "readFileSync").mockReturnValue("");
      vi.mocked(getPackageName).mockReturnValue(packageName);
      updateChangelogFile(nextRelease, releaseNotesBodyWithoutChangelog, mockedContext.cwd);
      expect(createChangelogFile).toHaveBeenCalledWith(
        path,
        `# ${packageName}\n\n## 1.0.0\n\n`,
        releaseNotesBodyWithoutChangelog
      );
    });
    it("should update an existing changelog file", () => {
      const mockedSpyOn = vi
        .spyOn(fs, "writeFileSync")
        .mockImplementation((_path, _expectedUpdatedChangelogFile) => undefined);
      vi.spyOn(fs, "existsSync").mockReturnValue(true);
      vi.spyOn(fs, "readFileSync").mockReturnValue(existingChangelogFile);
      vi.mocked(getPackageName).mockReturnValue(packageName);
      vi.mocked(formatReleaseNotesBody).mockReturnValue(formattedReleaseNotesBody);
      updateChangelogFile(nextRelease, releaseNotesBody, mockedContext.cwd);
      // TODO: uncomment when the file is written
      // expect(mockedSpyOn).toHaveBeenCalledWith(path, expectedUpdatedChangelogFile);
    });
  }
);
