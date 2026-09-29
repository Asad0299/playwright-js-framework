import baseTest, { expect } from '@playwright/test';
import LoginPage from '../pages/login_page.js';
import HomePage from '../pages/home_page.js';
import DashboardPage from '../pages/dashboard_page.js';

export const test = baseTest.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
});

export { expect };
