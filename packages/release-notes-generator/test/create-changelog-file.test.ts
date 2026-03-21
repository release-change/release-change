import fs from "node:fs";

import { getPackageName } from "@release-change/get-packages";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { formatReleaseNotesBody } from "../src/format-release-notes-body.js";
import { updateChangelogFile } from "../src/index.js";
import { mockedChangelogFiles } from "./fixtures/mocked-changelog-files.js";
import { mockedContext } from "./fixtures/mocked-context.js";

vi.mock("@release-change/get-packages", () => ({ getPackageName: vi.fn() }));
vi.mock("../src/format-release-notes-body", () => ({ formatReleaseNotesBody: vi.fn() }));

beforeEach(() => {
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
});

describe.each(mockedChangelogFiles)("for $nextRelease.name", ({
  nextRelease,
  packageName,
  path,
  releaseNotesBodyWithoutChangelog,
  formattedReleaseNotesBodyWithoutFullChangelog,
  expectedNewChangelogFile
}) => {
  it("should write a new changelog file", () => {
    const mockedSpyOn = vi
      .spyOn(fs, "writeFileSync")
      .mockImplementation((_path, _expectedNewChangelogFile) => undefined);
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    vi.mocked(getPackageName).mockReturnValue(packageName);
    vi.mocked(formatReleaseNotesBody).mockReturnValue(
      formattedReleaseNotesBodyWithoutFullChangelog
    );
    updateChangelogFile(nextRelease, releaseNotesBodyWithoutChangelog, mockedContext.cwd);
    expect(mockedSpyOn).toHaveBeenCalledWith(path, expectedNewChangelogFile);
  });
});
