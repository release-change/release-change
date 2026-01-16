# @release-change/npm

## 0.1.1

### Dependencies updates

- @release-change/config@0.1.1
- @release-change/get-packages@0.1.1
- @release-change/logger@0.1.1
- @release-change/shared@0.1.1

---

**Full changelog:** [`@release-change/npm@v0.1.0...@release-change/npm@v0.1.1`](https://github.com/release-change/release-change/compare/@release-change/npm@v0.1.0...@release-change/npm@v0.1.1)

## 0.1.0

### Minor changes

- **npm:** enable publishing package to NPM ([`d48ff11`](https://github.com/release-change/release-change/commit/d48ff11a708df6a7050593106235e35fd472f21b))
- **github:** enhance the way errors are displayed in fail comments ([`8cfd976`](https://github.com/release-change/release-change/commit/8cfd9767a47588c519492132486008ee8b7cdac8))
- **github:** collect errors thrown and display them in fail comments ([`4fbb306`](https://github.com/release-change/release-change/commit/4fbb30649bbf6427902e319c71f06abe43503eb6))
- **shared:** make `releaseInfos` property mandatory in context object ([`a27c22b`](https://github.com/release-change/release-change/commit/a27c22b58ae588ceb02875c01911b92c9cba16aa))
- **logger:** set scope for logger out of debug mode ([`45760a9`](https://github.com/release-change/release-change/commit/45760a991812e502b55e9c98b3f35ca01b94df30))
- **npm:** prepare package publishing and publish only after push step ([`2884d45`](https://github.com/release-change/release-change/commit/2884d45c3a7444d6f9f527c89c446bea4ffc5c55))
- **npm:** prepare publication to NPM registry ([`9b36f14`](https://github.com/release-change/release-change/commit/9b36f142a08c88dc329e9c625e19793dc69d1fad))

### Patch changes

- **npm:** pass the path of the current package as current working directory ([`7663622`](https://github.com/release-change/release-change/commit/7663622a43f0aa25997354c8dbd15ecdb1ec8104))
- **npm:** add `--no-git-checks` when pnpm is used ([`7418f98`](https://github.com/release-change/release-change/commit/7418f985dedc5244ac2efdedb91b11d4c317acb9))
- enhance error catching from commands run ([`3a67df5`](https://github.com/release-change/release-change/commit/3a67df58562108cc18baca87fe03b1b6ffac095e))

### Dependencies updates

- @release-change/config@0.1.0
- @release-change/get-packages@0.1.0
- @release-change/logger@0.1.0
- @release-change/shared@0.1.0
