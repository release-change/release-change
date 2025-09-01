# @release-change/ci

Get environment variables related to the CI

![License: MIT](https://img.shields.io/github/license/release-change/release-change)
[![ESM-only package](https://img.shields.io/badge/package-ESM--only-ffe536)](https://nodejs.org/api/esm.html)
[![Conventional Commits 1.0.0](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![Formatted with Biome](https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev/)
![NPM latest version](https://img.shields.io/npm/v/%40release-change%2Fci/latest)
![Node support](https://img.shields.io/node/v/%40release-change%2Fci)
![Build status](https://img.shields.io/github/actions/workflow/status/release-change/release-change/run-tests.yml)

## Properties

- `isCi`: `true` if the current environment is a CI environment, `false` otherwise;
- `isPullRequest`: `true` if the current event is triggered by a pull request, `false` otherwise.

## Supported CI environments

- [GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/variables#default-environment-variables).

## Copyright & licence

© 2025 Victor Brito — Released under the [MIT licence](./LICENSE).
