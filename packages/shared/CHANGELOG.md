# @release-change/shared

## 0.1.0

### Minor changes

- **github:** enhance the way errors are displayed in fail comments ([`8cfd976`](https://github.com/release-change/release-change/commit/8cfd9767a47588c519492132486008ee8b7cdac8))
- **github:** collect errors thrown and display them in fail comments ([`4fbb306`](https://github.com/release-change/release-change/commit/4fbb30649bbf6427902e319c71f06abe43503eb6))
- **shared:** fill `cause` property in `Error` object when an error is thrown ([`32e6352`](https://github.com/release-change/release-change/commit/32e63520bcf2524e4b76599930337c83b0ce6013))
- **github:** prepare success comment posting ([`5e222e5`](https://github.com/release-change/release-change/commit/5e222e5853cd634a9b449c2cdf4fe5d9c50dfa22))
- **shared:** make `releaseInfos` property mandatory in context object ([`a27c22b`](https://github.com/release-change/release-change/commit/a27c22b58ae588ceb02875c01911b92c9cba16aa))
- **github:** populate `context.references` with Git tags associated to found PRs and issues ([`7cf1cdd`](https://github.com/release-change/release-change/commit/7cf1cdded6985c96f1f403a4048bbcfd847249ed))
- **shared:** make `runCommand()` able to pass options ([`525482c`](https://github.com/release-change/release-change/commit/525482c46d65e16b5a227e69a4539527f2327917))
- **npm:** prepare publication to NPM registry ([`9b36f14`](https://github.com/release-change/release-change/commit/9b36f142a08c88dc329e9c625e19793dc69d1fad))
- **release-notes-generator:** prepare release notes creation ([`4a341d4`](https://github.com/release-change/release-change/commit/4a341d469b81290386586424c16efbd64cda826e))
- **shared:** add the run command as the error cause ([`d3c3f33`](https://github.com/release-change/release-change/commit/d3c3f33244d26f7d18a91efd93e0d5a935a71cf5))
- **release:** include package path in last and next releases ([`e1efad2`](https://github.com/release-change/release-change/commit/e1efad28960ff38b81c765e7e14f5aefd690ad83))
- **commit-analyser:** tell whether the parsed commit is a merge commit ([`40ad044`](https://github.com/release-change/release-change/commit/40ad044bc0b4919c87d244ac7089ca1bee3f46cf))
- **github:** get PRs and issues related to commits ([`2bc6bf5`](https://github.com/release-change/release-change/commit/2bc6bf5a98611cbd0e98138de0d8383704500f84))
- **cli:** manage remote Git repo name with CLI flag or config file ([`9e7f21f`](https://github.com/release-change/release-change/commit/9e7f21fbd400bcf80358748b28a115f08d530221))
- **cli:** set next release considering each package to release in a monorepo context ([`3f88b05`](https://github.com/release-change/release-change/commit/3f88b05fc623051c11f6b4128842697fe938d607))
- **cli:** set last release for each package ([`c275869`](https://github.com/release-change/release-change/commit/c275869598ce3637d538823924d07b0d2e8dce63))
- **get-packages:** get the package name for each package found ([`390d3a2`](https://github.com/release-change/release-change/commit/390d3a2cb1fa9bebad5adb743efc49f0dde91d21))
- **get-packages:** add multi-package detection for monorepos ([`f928dd0`](https://github.com/release-change/release-change/commit/f928dd07283522cb8f0d2e35f498b8210a19c229))

### Patch changes

- enhance error catching from commands run ([`3a67df5`](https://github.com/release-change/release-change/commit/3a67df58562108cc18baca87fe03b1b6ffac095e))
