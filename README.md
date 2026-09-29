# Playwright JavaScript Automation Framework

## Project Overview
This repository is an enterprise-style Playwright JavaScript automation framework designed for scalable UI and API automation in CI/CD environments. The framework follows a maintainable architecture grounded in the Page Object Model, Playwright fixtures, externalized test data, environment-driven configuration, and professional reporting.

The goal is to provide a reusable foundation that can evolve with modern QA automation needs while remaining understandable to teams that need to maintain it over time.

## Architecture
The framework is organized by responsibility:

- Tests: business-focused scenarios and assertions.
- Fixtures: reusable Playwright dependencies for page objects.
- Page Objects: user-facing page interactions and locators.
- Utilities: logging, screenshots, JSON loading, Excel reading.
- API: reusable request handling for future API automation.
- Configuration: environment and runtime configuration.
- Test Data: JSON and optional Excel-driven data.
- Reports: Playwright HTML, Allure, and raw artifacts.
- CI: GitHub Actions workflow for automated runs.

## Technology Stack
- JavaScript
- Node.js
- Playwright
- Playwright Test
- Page Object Model
- Fixtures
- Allure reporting
- dotenv
- ExcelJS
- GitHub Actions

## Installation
```bash
npm install
npx playwright install
```

## Environment setup
Copy the example environment file and update it with your values:
```bash
cp .env.example .env
```

Important points:
- `ENV` chooses the active environment.
- `BROWSER` selects the browser to run.
- Keep all credentials and secrets in local `.env` files and GitHub Secrets.
- Never commit `.env` or authentication state.

## Running tests
```bash
npm test
```

### Headed
```bash
npm run test:headed
```

### Debug
```bash
npm run test:debug
```

### Specific test
```bash
npx playwright test tests/login/login.spec.js
```

### Environment
```bash
npm run test:qa
npm run test:staging
```

### Browser
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Tags
```bash
npm run test:smoke
npm run test:sanity
npm run test:regression
```

### Parallel execution
```bash
npm run test:parallel
```

## Allure
Generate and open the Allure report:
```bash
npm run allure:generate
npm run allure:open
```

Optional local serving:
```bash
npm run allure:serve
```

## Authentication
The framework uses Playwright storage state for authentication reuse. The setup script signs in once and stores the authenticated browser state in `auth/user.json`.

This reduces repeated login work and keeps tests efficient.

## Failure artifacts
On failure, Playwright preserves:
- screenshots
- videos
- traces
- HTML reports
- test output artifacts

These are stored under `test-results/` and the configured report directories.

## Folder structure
- `.github/workflows`: GitHub Actions CI workflow.
- `api`: API request infrastructure.
- `auth`: storage state output directory.
- `config`: environment configuration.
- `fixtures`: reusable Playwright fixtures.
- `pages`: Page Object Model classes.
- `test-data`: external JSON test data.
- `tests`: test suites grouped by feature area.
- `utils`: reusable helper functions.
- `scripts`: setup and automation scripts.
- `reports`: Allure output.
- `test-results`: Playwright artifact storage.

## CI/CD
This project includes a GitHub Actions workflow that:
- checks out the repository
- sets up Node.js
- installs dependencies
- installs browsers
- runs the test suite
- generates the Allure report
- uploads Playwright and Allure artifacts

## Coding standards
The project follows these rules:
- ES modules only
- async/await for async flows
- accessible Playwright locators
- no arbitrary waits
- no hard-coded credentials
- no unnecessary dependencies
- clear responsibilities between layers
- maintainable, readable assertions

## Notes
This framework is intentionally structured for real enterprise usage while remaining understandable for a QA engineer or automation team to maintain. The sample tests use a standard login flow pattern and can be adapted to a real application by replacing the environment values and selectors.
