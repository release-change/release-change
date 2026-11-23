import { expect, it } from "vitest";

import { isProvenanceAllowed } from "../src/is-provenance-allowed.js";
import { mockedPackageManifestContents } from "./fixtures/mocked-package-manifest-contents.js";

it.each(mockedPackageManifestContents)(
  "should return $expectedProvenanceState",
  ({ content, expectedProvenanceState }) => {
    expect(isProvenanceAllowed(content)).toBe(expectedProvenanceState);
  }
);
