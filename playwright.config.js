import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { getBaseUrl, getBrowserName, getEnvironment } from './config/environments.js';

dotenv.config();

const environment = getEnvironment();
const browserName = getBrowserName();

export default defineConfig({
  globalSetup: './global-setup.js',
  testDir: './tests',
  fullyParallel: true,
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { outputFolder: 'reports/allure-results' }],
  ],
  outputDir: 'test-results',
  use: {
    baseURL: getBaseUrl(),
    storageState: 'auth/orangehrm.json',
    headless: process.env.HEADLESS !== 'false',
    actionTimeout: 15000,
    navigationTimeout: 30000,
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    browserName,
    locale: 'en-US',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        browserName: 'firefox',
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        browserName: 'webkit',
      },
    },
  ],
  metadata: {
    environment,
    browserName,
  },
});
