# Playwright JavaScript Automation Framework Standards

This project is a production-ready Playwright + JavaScript automation framework for enterprise UI and API automation. It follows a maintainable, scalable architecture grounded in the Page Object Model, fixtures, configuration-driven execution, and strong quality standards.

## 1. Core technical standards

### JavaScript and Node.js
- Use JavaScript as the primary language.
- Use ES modules consistently (`import` / `export`).
- Use `async/await` for all asynchronous operations.
- Prefer `const` by default; use `let` only when reassignment is required.
- Keep functions small, focused, and descriptive.
- Use semicolons and consistent formatting.
- Avoid mixing CommonJS and ES modules.

### Playwright + Playwright Test
- Use `@playwright/test` for all browser tests.
- Use Playwright-native assertions such as `expect(locator).toBeVisible()`.
- Use Playwright fixtures for cross-cutting dependencies.
- Prefer role-, label-, placeholder-, and text-based locators.
- Use browser contexts and storage state correctly for authenticated flows.
- Keep tests independent and executable in any order.

## 2. Architecture principles

### Clean architecture
The framework is organized into these responsibilities:
- Tests: business scenarios and assertions.
- Page Objects: UI behavior and page interactions.
- Fixtures: reusable test dependencies.
- Utilities: logging, screenshots, JSON, Excel support.
- API layer: reusable request logic.
- Configuration: environment-specific values.
- Data layer: external test data.
- Reports: artifacts for CI and debugging.

### SOLID and DRY
- Keep responsibilities separated.
- Avoid duplicate logic.
- Reuse BasePage, fixtures, and utilities where applicable.
- Avoid unnecessary abstraction.
- Keep architecture understandable for QA engineers.

## 3. Page Object Model (POM)
Page objects should:
- Represent a real page or component.
- Contain locators and interaction methods.
- Hide implementation details.
- Avoid business-specific logic when possible.
- Avoid test assertions unless they are a validation helper.
- Reuse `BasePage` for common operations.

### POM rules
- Tests should describe the business behavior, not low-level UI actions.
- Page objects should expose meaningful actions like `login()`, `openDashboard()`, `logout()`.
- Keep selectors in page objects, not test files.
- Prefer reusable helper methods over repeated code.

## 4. Fixtures
- Use Playwright fixtures for shared dependencies.
- Provide fixtures for page objects that are reused across test files.
- Do not introduce unnecessary global state.
- Avoid creating stateful fixtures unless they are required.

Example:
- `loginPage`
- `homePage`
- `dashboardPage`

## 5. Locator strategy
Prefer the following locator types:
- `page.getByRole()`
- `page.getByLabel()`
- `page.getByPlaceholder()`
- `page.getByText()`
- `page.getByTestId()`

Avoid:
- brittle CSS or chained selectors when accessible locators are available
- XPath unless there is a legitimate reason
- unnecessary CSS selectors

## 6. Wait rules
Never use arbitrary waits like:
```js
await page.waitForTimeout(5000);
```
unless there is a documented, legitimate reason.

Prefer:
```js
await expect(locator).toBeVisible();
await expect(locator).toBeEnabled();
await page.waitForURL();
await locator.waitFor();
```
Use Playwright's automatic waiting and web-first assertions whenever possible.

## 7. Assertions
Use Playwright web-first assertions.

Examples:
```js
await expect(locator).toBeVisible();
await expect(locator).toHaveText();
await expect(locator).toHaveURL();
await expect(locator).toBeEnabled();
```
Avoid weak assertions when a Playwright assertion is available.

## 8. Test isolation and independence
- Each test must be independently executable.
- Do not depend on execution order.
- Use isolated test data and state.
- Prefer storage-state reuse for authenticated scenarios.
- Avoid cross-test mutation of shared state.

## 9. Test data management
- Keep test data outside test files.
- Use JSON as the default data format.
- Use `exceljs` only when Excel is genuinely required.
- Support data-driven tests.
- Keep credentials and secrets out of source files.

## 10. Environment management
The framework supports multiple runtime environments:
- `qa`
- `staging`
- `production`

Configuration is driven by environment variables and a central environment map.

## 11. Authentication and storage state
Use Playwright `storageState` to:
- log in once
- save authentication state
- reuse authentication state
- avoid repeated login operations

Do not commit authentication state or session files.

## 12. API automation architecture
The API layer must be structured for future growth without rework.
- `base_api.js` contains shared request logic.
- Endpoint modules are separate and focused.
- Use Playwright `APIRequestContext`.
- Support `GET`, `POST`, `PUT`, and `DELETE`.

## 13. Logging
Use a centralized logger with levels:
- `error`
- `warn`
- `info`
- `debug`

Respect `LOG_LEVEL` from environment configuration.

## 14. Screenshots, videos, traces, and artifacts
Failure artifacts must be preserved in CI.
- Screenshots: only on failure
- Video: retain on failure
- Trace: on first retry
- HTML report enabled
- Allure results generated
- Test results stored in `test-results/`

## 15. Reporting
This project integrates:
- Playwright HTML report
- Allure report
- test artifacts for CI debugging

## 16. Retry strategy
- Local execution: 0 retries
- CI execution: 2 retries
Use Playwright's native retry settings, not custom loops.

## 17. Parallel execution
- Use Playwright workers for parallel test execution.
- Keep tests safe for parallelized runs.
- Do not build a custom parallel framework.

## 18. CI/CD and GitHub Actions
The framework is CI-friendly.
- Run in GitHub Actions.
- Upload Playwright reports, Allure results, and test results as artifacts.
- Preserve artifacts on failures.
- Use GitHub Secrets for sensitive environment values.

## 19. Error handling and debugging
- Log actionable errors.
- Preserve artifact capture on failures.
- Investigate root cause before changing architecture.
- Keep failures readable and actionable.
- Do not suppress errors.

## 20. Naming conventions
- Use descriptive file names.
- Use clear, intention-revealing method names.
- Prefer `loginPage` over generic variable names.
- Use consistent names across POM, fixtures, tests, and utilities.

## 21. JavaScript coding standards
- Use ES modules.
- Keep code readable and maintainable.
- Use small, focused methods.
- Use descriptive variable names.
- Keep comments meaningful and minimal.
- Prefer simple solutions over overly complex abstraction.

## 22. Reusable utilities
The project includes reusable utilities for:
- logging
- screenshot handling
- JSON-driven test data
- Excel reading only when genuinely needed

These utilities must be reused rather than reimplemented.

## 23. Configuration management
- Use environment variables for dynamic runtime values.
- Keep configuration centralized.
- Store placeholders in `.env.example`.
- Do not hard-code environment values in tests.
- Do not commit `.env` files.

## 24. Security and secrets management
- Never commit credentials, tokens, cookies, API keys, or storage state.
- Use `.env` locally and GitHub Secrets in CI.
- Keep `.gitignore` aligned with secret storage requirements.
- Ensure auth files are ignored.

## 25. Code review expectations
Every change should be reviewed for:
- correct architecture usage
- consistent imports
- correct fixture usage
- no duplicate utilities
- no hard-coded waits
- no hard-coded credentials
- no unnecessary dependency additions
- no unmaintainable abstraction

## 26. Implementation guidance
When creating or editing code, ask:
- Does this belong in a Page Object, fixture, utility, configuration, API, or test?
- Is this reusable?
- Does this increase maintainability?
- Does this introduce unnecessary abstraction?
- Is this compatible with Playwright best practices?

## 27. Final quality bar
The project must be:
- executable
- enterprise-ready
- maintainable
- scalable
- CI-friendly
- consistent across all modules
- free of Python-specific dependencies
- free of hard-coded secrets
- free of custom retry logic and arbitrary waits

This repo is meant to be used as a real-world example of a professional QA automation framework.
