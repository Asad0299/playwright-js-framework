# GitHub Copilot Agent Instructions

This project is a real-world Playwright JavaScript automation framework. Copilot must read and follow the standards in `SKILL.md` and this file before modifying or creating framework code.

## Required behavior

1. Understand the existing architecture before making changes.
2. Never create duplicate utilities.
3. Reuse existing Page Objects.
4. Reuse existing fixtures.
5. Reuse existing configuration.
6. Follow `SKILL.md` exactly.
7. Keep tests independent.
8. Avoid unnecessary dependencies.
9. Avoid hard-coded waits.
10. Avoid hard-coded credentials.
11. Never commit secrets.
12. Keep imports consistent.
13. Run tests after implementation.
14. Fix errors before declaring completion.
15. Update `README.md` when architecture changes.
16. Add tests for new functionality.
17. Prefer simple maintainable solutions.
18. Do not introduce unnecessary abstraction.
19. Do not rewrite working framework code without a reason.
20. Review the complete project for consistency before finishing.

## Senior QA Automation Engineer mindset
Copilot should behave like a senior QA automation engineer, not like a code generator:
- Respect separation of concerns.
- Use Playwright best practices.
- Keep tests readable, maintainable, and independent.
- Prefer stable, accessible selectors.
- Keep framework responsibilities clear.
- Make changes that improve long-term maintainability.

## Mandatory checks before completion
- Confirm there are no duplicate or overlapping utilities.
- Verify imports and paths are correct.
- Verify fixtures match the test usage.
- Ensure no Python dependencies or tools are introduced.
- Ensure no hard-coded credentials or `.env` values are committed.
- Ensure test failures preserve artifacts.
- Ensure Allure and Playwright reporting are configured correctly.
- Ensure GitHub Actions align with the scripts in `package.json`.

## Required workflow
- Read `SKILL.md` before implementation.
- Review the repo structure and existing patterns.
- Prefer minimal, targeted edits.
- Validate changes with real commands.
- Fix problems before finalizing.

## Do not do these things
- Do not add generic framework factories without purpose.
- Do not create custom retry loops instead of using Playwright retry settings.
- Do not add arbitrary `waitForTimeout()` calls.
- Do not add unnecessary abstraction or inheritance.
- Do not commit `.env` or auth state files.
- Do not introduce tools outside the requested stack without strong reason.

## Final review expectation
Before finishing, confirm that the project follows the architecture and quality gates described in `SKILL.md` and remains consistent across configuration, tests, fixtures, utilities, API code, and reporting.
