export const mockedCommitsInMonorepo = `commit 4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5
Merge: 7908467 72f01b7
Author: Contributor <0+userId@users.noreply.github.com>
Date:   Mon Mar 10 08:36:27 2025 +0100

    feat(release): set last release (#75)

commit 72f01b737cc5308bda1a7035c56a95987187f0bc (origin/feature-branch)
Author: userId <mail@mailbox.com>
Date:   Mon Mar 10 08:34:05 2025 +0100

    test(release): refactor the code getting the latest valid Git tag

packages/release/test/get-latest-valid-git-tag.test.ts

commit bc13eeeb0c0c57212ef7f634ec41f610e29438a2
Author: userId <mail@mailbox.com>
Date:   Mon Mar 10 08:33:29 2025 +0100

    refactor(release): refactor the code getting the latest valid Git tag

packages/release/src/get-latest-valid-git-tag.ts

commit 2e8e93680920d864c5e53fe4114313104a56ef32
Author: userId <mail@mailbox.com>
Date:   Mon Mar 10 06:03:59 2025 +0100

    test(release): set last release

packages/release/test/set-last-release.test.ts

commit 08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67
Author: userId <mail@mailbox.com>
Date:   Mon Mar 10 06:03:37 2025 +0100

    feat(release): set last release

packages/release/src/set-last-release.ts

commit 23c8ae7c866ab138968e26e865bf28388aa893d1
Author: userId <mail@mailbox.com>
Date:   Mon Mar 10 04:48:26 2025 +0100

    test(git): remove test checking the return \`false\` if the package cannot publish from the branch
    
    Another function calling \`getAllTags()\` checks such a condition from now on.

packages/git/test/file.test.ts

commit 67a67bf2f614c1e3c5292c780bb4c5c4e91b4c78
Author: userId <mail@mailbox.com>
Date:   Mon Mar 10 04:45:41 2025 +0100

    refactor(git): stop checking if the package can publish from branch
    
    Another function calling \`getAllTags()\` does such a checking from now on.

packages/git/src/file.ts

commit 60e154c496f20f0d806229893cad54d53c6c8bc8
Author: userId <mail@mailbox.com>
Date:   Mon Mar 10 04:42:01 2025 +0100

    refactor(config): add \`version\` optional property to type \`Package\`

packages/config/src/config.types.ts
`;
