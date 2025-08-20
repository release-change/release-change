# release-change

Fully automated version management, changelog management and package publishing with a focus on monorepos, pre-releases and major version zero

![License: MIT](https://img.shields.io/github/license/release-change/release-change)
[![ESM-only package](https://img.shields.io/badge/package-ESM--only-ffe536)](https://nodejs.org/api/esm.html)
[![Conventional Commits 1.0.0](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![Formatted with Biome](https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev/)
![NPM latest version](https://img.shields.io/npm/v/%40release-change%2Fcli/latest)
![Node support](https://img.shields.io/node/v/%40release-change%2Fcli)
![Build status](https://img.shields.io/github/actions/workflow/status/release-change/release-change/run-tests.yml)

**release-change** automates the release workflow, determining the next version number, generating release notes and publishing the package.

## How does it work?

release-change uses the commit messages to determine the type of change in the codebase. It automatically determines the next [semantic version](https://semver.org).

It uses the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. The following table shows which release type is got from which commit message when `release-change` runs:

| Commit message                                                                                              | Release type                                                                                          |
|-------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| `fix: prevent racing of requests`                                                                           | Patch (fix release)                                                                                   |
| `feat(lang): add Polish language`                                                                           | Minor (feature release)                                                                               |
| `chore!: drop support for Node 6`                                                                           | Major (breaking release)                                                                              |
| `chore: drop support for Node 6`<br><br>`BREAKING CHANGE: use JavaScript features not available in Node 6.` | Major (breaking release, note that the `BREAKING CHANGE: ` token must be in the footer of the commit) |

It is meant to be integrated in a CI environment. For each new commit added to one of the release branches (for example: `main`), with `git push`, a pull request merging or a merging from another branch, a CI build is triggered and runs the `release-change` command to make a release if there are codebase changes since the last release which affect the package functionalities.

## Requirements

To use release-change, you need:
- to host your code in a GitHub repository,
- to use GitHub Actions,
- Git 2.48.1+,
- a [Node.js](https://nodejs.org) which meets the [version requirements](../../SECURITY.md#supported-nodejs-versions),
- a package manager which meets the [version requirements](../../SECURITY.md#supported-package-manager-versions).

## Installation

Install package for Node.js:
```
pnpm add --save-dev @release-change/cli
```
You can also install it using `npm`:
```
npm install --save-dev @release-change/cli
```

## Usage

Use the following command to run release-change in the CI environment:
```
pnpx release-change
```
If you are using `npm`:
```
npx release-change
```

## Documentation

### CI configuration

release-change requires access to the project repository. The Git authentication is set with the `RELEASE_TOKEN` environment variable, which is a [GitHub personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

Here are examples of the workflow configuration (the file must be saved in the `.github/workflows/` directory):
- using `pnpm`:
  ```yaml
  name: Release
  
  on:
    push:
      branches:
        - main
  
  permissions:
    contents: read # for checkout
  
  jobs:
    release:
      name: Release
      runs-on: ubuntu-latest
      permissions:
        contents: write # to be able to publish a GitHub release
      steps:
        - name: Checkout
          uses: actions/checkout@v4
          with:
            fetch-depth: 0 # to clone the whole Git history
        - name: Install pnpm
          uses: pnpm/action-setup@v4
          with:
            version: 10
        - name: Setup Node.js
          uses: actions/setup-node@v4
          with:
            node-version: "lts/*"
            cache: "pnpm"
        - name: Install dependencies
          run: pnpm install
        - name: Release
          env:
            RELEASE_TOKEN: ${{ secrets.RELEASE_TOKEN }}
          run: pnpx release-change
  ```
- using `npm`:
  ```yaml
  name: Release
  
  on:
    push:
      branches:
        - main
  
  permissions:
    contents: read # for checkout
  
  jobs:
    release:
      name: Release
      runs-on: ubuntu-latest
      permissions:
        contents: write # to be able to publish a GitHub release
      steps:
        - name: Checkout
          uses: actions/checkout@v4
          with:
            fetch-depth: 0 # to clone the whole Git history
        - name: Setup Node.js
          uses: actions/setup-node@v4
          with:
            node-version: "lts/*"
            cache: "npm"
        - name: Install dependencies
          run: npm clean-install
        - name: Release
          env:
            RELEASE_TOKEN: ${{ secrets.RELEASE_TOKEN }}
          run: npx release-change
  ```

### Configuration

#### Configuration file

release-change’s options can be set via a `release-change.config.json` file, written in JSON and placed at the root of the project.

Alternatively, some options can be set via CLI arguments.

The following examples are the same:
- via `release-change.config.json` file:
  ```json
  {
    "branches": ["main", "next"]
  }
  ```
- via CLI arguments:
  ```
  release-change --branches main next
  ```

#### Options

##### branches

Type: `array`  
Default: `["alpha", "beta", "main", "master", "next"]`  
CLI arguments: `-b`, `--branches`

The branches on which releases should happen.

##### repositoryUrl

Type: `string`  
Default: `repository` property in `package.json` file or [Git remote URL](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes)  
CLI arguments: `-r`, `--repository-url`

The Git repository URL.

##### debug

Type: `boolean`  
Default: `false`  
CLI arguments: `--debug`

Output debugging information.

##### dryRun

Type: `boolean`  
Default: `false`  
CLI arguments: `-d`, `--dry-run`

The goal of the dry-run mode is to get a preview of the pending release. The dry-run mode skips the release and the publication steps but checks the repository push permissions.

##### releaseType

Type: `object`  
Default:
```
{
  alpha: {
    channel: "alpha",
    prerelease: true,
    prereleaseIdentifier: "alpha"
  },
  beta: {
    channel: "beta",
    prerelease: true,
    prereleaseIdentifier: "beta"
  },
  main: {
    channel: "default"
  },
  master: {
    channel: "default"
  },
  next: {
    channel: "next",
    prerelease: true,
    prereleaseIdentifier: "rc"
  }
}
```

Sets an object whose properties are the names of the branches on which the releases should happen. Each branch property is an object with the following properties (all of them are optional):
- `channel`: the distribution tag associated with the releases when publishing to NPM, which will use the default distribution tag (`"latest"`) if the value is `"default"`, the value provided otherwise;
- `prerelease`: `true` if the release should be treated like a pre-release (e.g.: for unstable versions), `false` otherwise;
- `prereleaseIdentifier`: the identifier to use when tagging a pre-release version (for example, `"beta"` if the pre-release should be tagged as something like `2.0.0-beta.1`).

## Get help

- [Stack Overflow](https://stackoverflow.com/questions/tagged/release-change)

## Copyright & licence

© 2025 Victor Brito — Released under the [MIT licence](./LICENSE).
