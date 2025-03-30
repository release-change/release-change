# Security policy

## Supported versions

The latest version of release-change is currently supported with security updates.

### Supported Node.js versions

Node.js 18.20.5+, 20.18.3+ and 22.12.0+ are supported. **Odd major versions are not supported.**

### Supported package manager versions

`npm` 10.8.2+ and `pnpm` 10.7.0+ are supported. **`yarn` is not supported.**

## Reporting a vulnerability

Please report (suspected) security vulnerabilities via [GitHub’s security advisory reporting system](https://github.com/release-change/release-change/security/advisories/new).

**There are not (and there are no plans to offer) any bug bounties, swag or any other reward for reporting vulnerabilities.**

During the public disclosure, the reporter can be given credit and a link can be made to any social accounts you wish to see added, including linking to your own blog post detailing the vulnerability.

Please note the following requirements (all are required):
- summary of the suspected vulnerability and its impact (who does this impact and how),
- information about whether the problem has been patched (and what versions should users upgrade to),
- description of possible workarounds (if there is a way for users to fix or remediate the vulnerability without upgrading),
- information about references and any links users can visit to find out more.

Also note the following recommendations to complete the requirements above:
- detailed information as to what the suspected vulnerability does and what it has access to,
- proof of concept (code samples at minimum, reproduction video optional: POC must include how the vulnerability can actually access sensitive data).

If the issue is confirmed, a patch will be released as soon as possible, depending on complexity.

### Third-party modules

Security vulnerabilities in third-party modules must be reported to the person or team maintaining the module.

## Other reporting platforms and bounties

release-change does not support other reporting platforms: all security vulnerabilities must be made via GitHub Advisory system.

List of some (though not all) platforms **which are not supported:**
- direct e-mail or communication to release-change contributors (Discord or Slack),
- Stack Overflow.
