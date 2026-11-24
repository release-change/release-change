# release-change

Fully automated version management, changelog management and package publishing with a focus on monorepos, pre-releases and major version zero

![License: MIT](https://img.shields.io/github/license/release-change/release-change)
[![ESM-only package](https://img.shields.io/badge/package-ESM--only-ffe536)](https://nodejs.org/api/esm.html)
[![Conventional Commits 1.0.0](https://img.shields.io/badge/Conventional_Commits-1.0.0-fe5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)
![Build status](https://img.shields.io/github/actions/workflow/status/release-change/release-change/run-tests.yml)

**release-change** automates the release workflow, determining the next version number, generating release notes and publishing the package.

## How does it work?

release-change uses the commit messages to determine the type of change in the codebase. It automatically determines the next [semantic version](https://semver.org).

It uses the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. The following table shows which release type is got from which commit message when `release-change` runs:

| Commit message                                                                                              | Release type                                                                                          |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `fix: prevent racing of requests`                                                                           | Patch (fix release)                                                                                   |
| `feat(lang): add Polish language`                                                                           | Minor (feature release)                                                                               |
| `chore!: drop support for Node 6`                                                                           | Major (breaking release)                                                                              |
| `chore: drop support for Node 6`<br><br>`BREAKING CHANGE: use JavaScript features not available in Node 6.` | Major (breaking release, note that the `BREAKING CHANGE: ` token must be in the footer of the commit) |

It is meant to be integrated in a CI environment. For each new commit added to one of the release branches (for example: `main`), with `git push`, a pull request merging or a merging from another branch, a CI build is triggered and runs the `release-change` command to make a release if there are codebase changes since the last release which affect the package functionalities.

When a release is made, a release pull request is automatically created. If your repository allows auto-merge, you can use the [release-change-approve bot](https://github.com/apps/release-change-approve) to automatically approve this release pull request.

## Requirements

To use release-change, you need:

- to host your code in a GitHub repository,
- to use GitHub Actions,
- Git 2.23.0+,
- a [Node.js](https://nodejs.org) which meets the [version requirements](./SECURITY.md#supported-nodejs-versions),
- a package manager which meets the [version requirements](./SECURITY.md#supported-package-manager-versions).

## Usage

### Without integrating with CI

If you do not publish to NPM and do not wish to use the CI environment, you can use the [release-change bot](https://github.com/apps/release-change).

### Integrating with CI

The easiest way is to use the [release-change GitHub action](https://github.com/release-change/action).

Here are examples of the workflow configuration (the file must be saved in the `.github/workflows/` directory and make sure [the option “Allow GitHub Actions to create and approve pull requests”](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#preventing-github-actions-from-creating-or-approving-pull-requests) is enabled in your repository settings).

#### With trusted publishing

- using `pnpm`:

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
            issues: write # to be able to comment on issues
            pull-requests: write # to be able to comment on pull requests
            id-token: write # to enable use of OpenID Connect to publish to NPM with provenance
          steps:
            - name: Checkout
              uses: actions/checkout@v7
              with:
                fetch-depth: 0 # to clone the whole Git history
            - name: Install pnpm and setup Node.js
              uses: pnpm/setup@v3
              with:
                version: 11
                runtime: node@lts
            - name: Install dependencies
              run: pnpm clean-install
            - name: Release and publish to NPM
              uses: release-change/action@v0
- using `yarn`:

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
            issues: write # to be able to comment on issues
            pull-requests: write # to be able to comment on pull requests
            id-token: write # to enable use of OpenID Connect to publish to NPM with provenance
          steps:
            - name: Checkout
              uses: actions/checkout@v7
              with:
                fetch-depth: 0 # to clone the whole Git history
            - name: Setup Node.js
              uses: actions/setup-node@v6
              with:
                node-version: "lts/*"
            - name: Enable Corepack
              shell: bash
              run: |
                npm install -g corepack
                corepack enable
            - name: Get Yarn cache directory
              id: yarn-cache-dir
              shell: bash
              run: echo "dir=$(yarn config get cacheFolder)" >> "$GITHUB_OUTPUT"
            - name: Get Yarn cache dependencies
              uses: actions/cache@v6
              with:
                path: ${{ steps.yarn-cache-dir.outputs.dir }}
                key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
                restore-keys: |
                  ${{ runner.os }}-yarn-
            - name: Install dependencies
              run: yarn install --immutable
            - name: Release and publish to NPM
              uses: release-change/action@v0
- using `npm`:

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
            issues: write # to be able to comment on issues
            pull-requests: write # to be able to comment on pull requests
            id-token: write # to enable use of OpenID Connect to publish to NPM with provenance
          steps:
            - name: Checkout
              uses: actions/checkout@v7
              with:
                fetch-depth: 0 # to clone the whole Git history
            - name: Setup Node.js
              uses: actions/setup-node@v6
              with:
                node-version: "lts/*"
                cache: "npm"
            - name: Install dependencies
              run: npm clean-install
            - name: Release and publish to NPM
              uses: release-change/action@v0
#### Without trusted publishing

- using `pnpm`:

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
            issues: write # to be able to comment on issues
            pull-requests: write # to be able to comment on pull requests
          steps:
            - name: Checkout
              uses: actions/checkout@v7
              with:
                fetch-depth: 0 # to clone the whole Git history
            - name: Install pnpm and setup Node.js
              uses: pnpm/setup@v3
              with:
                version: 11
                runtime: node@lts
            - name: Install dependencies
              run: pnpm clean-install
            - name: Release and publish to NPM
              uses: release-change/action@v0
              with:
                npm-token: ${{ secrets.NPM_TOKEN }}
- using `yarn`:

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
            issues: write # to be able to comment on issues
            pull-requests: write # to be able to comment on pull requests
          steps:
            - name: Checkout
              uses: actions/checkout@v7
              with:
                fetch-depth: 0 # to clone the whole Git history
            - name: Setup Node.js
              uses: actions/setup-node@v6
              with:
                node-version: "lts/*"
            - name: Enable Corepack
              shell: bash
              run: |
                npm install -g corepack
                corepack enable
            - name: Get Yarn cache directory
              id: yarn-cache-dir
              shell: bash
              run: echo "dir=$(yarn config get cacheFolder)" >> "$GITHUB_OUTPUT"
            - name: Get Yarn cache dependencies
              uses: actions/cache@v6
              with:
                path: ${{ steps.yarn-cache-dir.outputs.dir }}
                key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
                restore-keys: |
                  ${{ runner.os }}-yarn-
            - name: Install dependencies
              run: yarn install --immutable
            - name: Release and publish to NPM
              uses: release-change/action@v0
              with:
                npm-token: ${{ secrets.NPM_TOKEN }}
- using `npm`:

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
            issues: write # to be able to comment on issues
            pull-requests: write # to be able to comment on pull requests
          steps:
            - name: Checkout
              uses: actions/checkout@v7
              with:
                fetch-depth: 0 # to clone the whole Git history
            - name: Setup Node.js
              uses: actions/setup-node@v6
              with:
                node-version: "lts/*"
                cache: "npm"
            - name: Install dependencies
              run: npm clean-install
            - name: Release and publish to NPM
              uses: release-change/action@v0
              with:
                npm-token: ${{ secrets.NPM_TOKEN }}
## Documentation

### CI configuration

release-change requires access to the project repository. The Git authentication is set with the `RELEASE_TOKEN` environment variable, which is a [GitHub personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens), a [GitHub App token](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app) or the [GitHub-provided token](https://docs.github.com/en/actions/concepts/security/github_token).

The `ISSUE_PR_TOKEN` environment variable is used to authenticate with the GitHub API to comment on issues and pull requests, close issues and tag pull requests. It is a GitHub personal access token, a GitHub App token or the GitHub-provided token.

If you publish to NPM and did not, or cannot, set trusted publishing, you will need to have an [NPM token](https://docs.npmjs.com/creating-and-viewing-access-tokens) which can publish the packages in the repository concerned by the CI configuration, and you will need to [add it as a secret on your repository](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets) with the name `NPM_TOKEN`.

### Configuration

#### Configuration file

release-change’s options can be set via a `release-change.config.json` file, written in JSON and placed at the root of the project.

Alternatively, some options can be set via CLI arguments.

The following examples are the same:

- via `release-change.config.json` file:

      {
        "branches": ["main", "next"]
      }
- via CLI arguments:

      release-change --branches main next
#### Options

##### branches

Type: `array`  
Default: `["alpha", "beta", "main", "master", "next"]`  
CLI arguments: `-b <space-separated branches>`, `--branches <space-separated branches>`

The branches on which releases should happen.

##### repositoryUrl

Type: `string`  
Default: `repository` property in `package.json` file  
CLI arguments: `-r <url>`, `--repository-url <url>`

The Git repository URL.

##### remoteName

Type: `string`  
Default: `"origin"`  
CLI arguments: `--remote-name <name>`

The remote repository name.

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

##### dependencyUpdateMethod

Type: `string` or `null`  
Default: `"pin"` if it is a monorepo, `null` otherwise

This optional option sets a string telling how dependencies in each `package.json` file of the monorepo should be updated as far as the monorepo packages are concerned. Its value can be one of the following:

- `"pin"`: the dependencies will be updated using their exact new version (e.g.: `"@my-monorepo/my-package": "1.2.3"`);
- `"caret-range"`: the dependencies will be updated using their new version within a caret range (e.g.: `"@my-monorepo/my-package": "^1.2.3"`);
- `"tilde-range"`: the dependencies will be updated using their new version within a tilde range (e.g.: `"@my-monorepo/my-package": "~1.2.3"`);
- `"workspace"`: the dependencies will be updated using the `workspace:` protocol and the `*` range or only the `*` range if using `npm` (e.g.: `"@my-monorepo/my-package": "workspace:*"`).

If the repository is not a monorepo, the option is ignored.

##### npmPublish

Type: `false`  
Default: see below

This optional option, when set, can only be `false`. When this option is set, no packages are published to the NPM registry at all; however, the next release is still released and the `package.json` files are still updated. When the option is not set, the publication of each package depends on whether the `private` property in the `package.json` files is set to `true` or not.

## Get help

- [Stack Overflow](https://stackoverflow.com/questions/tagged/release-change)

## Copyright & licence

© 2025-present Victor Brito — Released under the [MIT licence](./LICENSE).
