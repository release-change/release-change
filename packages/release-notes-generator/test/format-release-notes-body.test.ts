import { expect, it } from "vitest";

import { formatReleaseNotesBody } from "../src/format-release-notes-body.js";
import { mockedReleaseNotesBodies } from "./fixtures/mocked-release-notes-bodies.js";

it.each(mockedReleaseNotesBodies)(
  "should format $body in Markdown",
  ({ body, formattedBody, formattedBodyForChangelog }) => {
    expect(formatReleaseNotesBody(body)).toBe(formattedBody);
    expect(formatReleaseNotesBody(body, true)).toBe(formattedBodyForChangelog);
  }
);
