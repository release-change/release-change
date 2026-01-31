# @release-change/logger

Print messages in the terminal for release-change

![License: MIT](https://img.shields.io/github/license/release-change/release-change)
[![ESM-only package](https://img.shields.io/badge/package-ESM--only-ffe536)](https://nodejs.org/api/esm.html)
[![Conventional Commits 1.0.0](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)
![NPM latest version](https://img.shields.io/npm/v/%40release-change%2Flogger/latest)
![Node support](https://img.shields.io/node/v/%40release-change%2Flogger)
![Build status](https://img.shields.io/github/actions/workflow/status/release-change/release-change/run-tests.yml)

## Usage

```ts
import { setLogger } from "@release-change/logger";

const logger = setLogger();
logger.logSuccess("Everything done successfully.");
```

## `setLogger` methods

- `setScope`: to print the scope concerned by any non-debug messages,
- `setDebugScope`: to print the scope concerned by any debug messages,
- `logDebug`: to print debug messages (`setLogger()` must be called with the `isDebug` argument set to `true`),
- `logInfo`: to print informational messages,
- `logError`: to print error messages,
- `logWarn`: to print warning messages,
- `logSuccess`: to assert to users that their instructions have completed successfully.

## Copyright & licence

© 2025-present Victor Brito — Released under the [MIT licence](./LICENSE).
