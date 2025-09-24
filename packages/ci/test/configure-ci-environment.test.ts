import { afterEach, assert, beforeEach, describe, it, vi } from "vitest";

import { configureCiEnvironment } from "../src/index.js";
import { isCiToolDetected } from "../src/is-ci-tool-detected.js";
import { mockedEnvs } from "./fixtures/mocked-envs.js";

beforeEach(() => {
  vi.mock("../src/is-ci-tool-detected.js", () => ({
    isCiToolDetected: vi.fn()
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

describe.each(mockedEnvs)("for $env", ({ ciEnvironment, env, expectedConfig }) => {
  const { isCi, isPullRequest } = expectedConfig;
  it(`should return an object with \`isCi\` set to \`${isCi}\` and \`isPullRequest\` set to \`${isPullRequest}\` when CI environment is ${ciEnvironment}`, () => {
    vi.mocked(isCiToolDetected).mockReturnValue(isCi);
    assert.deepEqual(configureCiEnvironment(env), expectedConfig);
  });
});
