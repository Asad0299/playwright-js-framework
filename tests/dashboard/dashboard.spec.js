import { test, expect } from '../../fixtures/test.js';
import { loadLoginData } from '../../utils/test_data.js';

const resolveUsername = (data) => data.valid.username || process.env.TEST_USERNAME;
const resolvePassword = (data) => data.valid.password || process.env.TEST_PASSWORD;

test.describe('Dashboard', () => {
  test('user can access profile menu @regression', async ({ loginPage, dashboardPage }) => {
    const loginData = await loadLoginData();

    await loginPage.open();
    await loginPage.login(
      resolveUsername(loginData),
      resolvePassword(loginData),
    );

    await dashboardPage.open();
    await dashboardPage.openProfile();

    await expect(dashboardPage.profileMenu).toBeVisible();
  });
});
