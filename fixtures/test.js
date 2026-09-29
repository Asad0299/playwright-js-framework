import baseTest, { expect } from '@playwright/test';
import LoginPage from '../pages/login_page.js';
import HomePage from '../pages/home_page.js';
import DashboardPage from '../pages/dashboard_page.js';
import NavigationPage from '../pages/navigation_page.js';
import AdminPage from '../pages/admin_page.js';
import PimPage from '../pages/pim_page.js';
import EmployeeListPage from '../pages/employee_list_page.js';
import LeavePage from '../pages/leave_page.js';
import TimePage from '../pages/time_page.js';
import RecruitmentPage from '../pages/recruitment_page.js';
import MyInfoPage from '../pages/my_info_page.js';

const trustedOrigin = 'https://opensource-demo.orangehrmlive.com';

export const test = baseTest.extend({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      ignoreHTTPSErrors: true,
    });

    await context.grantPermissions(['clipboard-read', 'clipboard-write'], {
      origin: trustedOrigin,
    });

    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  navigationPage: async ({ page }, use) => {
    await use(new NavigationPage(page));
  },
  adminPage: async ({ page }, use) => {
    await use(new AdminPage(page));
  },
  pimPage: async ({ page }, use) => {
    await use(new PimPage(page));
  },
  employeeListPage: async ({ page }, use) => {
    await use(new EmployeeListPage(page));
  },
  leavePage: async ({ page }, use) => {
    await use(new LeavePage(page));
  },
  timePage: async ({ page }, use) => {
    await use(new TimePage(page));
  },
  recruitmentPage: async ({ page }, use) => {
    await use(new RecruitmentPage(page));
  },
  myInfoPage: async ({ page }, use) => {
    await use(new MyInfoPage(page));
  },
});

export { expect };
