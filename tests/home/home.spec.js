import { test, expect } from '../../fixtures/test.js';
import { loadLoginData } from '../../utils/test_data.js';

const resolveUsername = (data) => data.valid.username || process.env.TEST_USERNAME;
const resolvePassword = (data) => data.valid.password || process.env.TEST_PASSWORD;

test.describe('Home page', () => {
  test('user can open dashboard from home page @sanity @regression', async ({
    loginPage,
    homePage,
    dashboardPage,
  }) => {
    const loginData = await loadLoginData();

    await loginPage.open();
    await loginPage.login(
      resolveUsername(loginData),
      resolvePassword(loginData),
    );

    await homePage.open();
    await homePage.openDashboard();

    await expect(dashboardPage.dashboardHeading).toBeVisible();
  });
});
