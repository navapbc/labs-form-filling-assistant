# Security Policy

## Supported versions

We always recommend using the latest version of the Form-Filling Assistant to ensure you get all security updates.

## Reporting vulnerabilities

Please do not file GitHub issues for security vulnerabilities, as they are public!

Nava takes security issues very seriously. If you have any concerns about this project or believe you have uncovered a vulnerability, please get in touch via the e-mail address labs@navapbc.com. In the message, try to provide a description of the issue and ideally a way of reproducing it. The team will get back to you as soon as possible.

Please report any security problems to us before disclosing it publicly.

## Automated scanning

Every pull request, every push to `main`, and a weekly schedule run:

- **Dependency audit** ([`security-scans.yml`](.github/workflows/security-scans.yml)): `pnpm audit` and [Trivy](https://trivy.dev) check `pnpm-lock.yaml` against two advisory databases. High or critical findings with an available fix fail the build. Trivy also scans the repository for committed secrets.
- **Static analysis** ([`codeql.yml`](.github/workflows/codeql.yml)): [CodeQL](https://codeql.github.com) analyzes the TypeScript source and the GitHub Actions workflows.
- **Dependency updates** ([`dependabot.yml`](.github/dependabot.yml)): Dependabot opens pull requests for security fixes and weekly version updates.

Third-party GitHub Actions are pinned to commit SHAs.

Findings that can't be fixed yet are listed in [`.trivyignore`](.trivyignore) or under `pnpm.auditConfig.ignoreGhsas` in `package.json`. Each exception has a documented reason in this file or in `.trivyignore`, and is removed once a fix ships.

### Current exceptions

| Advisory | Package | Why it's accepted | Last checked |
| --- | --- | --- | --- |
| [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) (high) | `braces` 3.0.3 | No patched release exists. Only reached through Tailwind CSS's build-time file watcher, never at runtime. | 2026-10-20 |
