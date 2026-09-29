import { test, expect } from '../../fixtures/test.js';
import { loadLoginData } from '../../utils/test_data.js';

const resolveUsername = (data) =>
  data.valid.username || process.env.ORANGEHRM_USERNAME || process.env.TEST_USERNAME || 'Admin';
const resolvePassword = (data) =>
  data.valid.password || process.env.ORANGEHRM_PASSWORD || process.env.TEST_PASSWORD || 'admin123';

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

  test('user can open the buzz feed and view recent posts @regression', async ({
    loginPage,
    dashboardPage,
  }) => {
    const loginData = await loadLoginData();

    await loginPage.open();
    await loginPage.login(
      resolveUsername(loginData),
      resolvePassword(loginData),
    );

    await dashboardPage.open();
    await dashboardPage.page.getByRole('link', { name: 'Buzz' }).click();

    await expect(dashboardPage.page).toHaveURL(/\/web\/index\.php\/buzz\/viewBuzz/);
    await expect(dashboardPage.page.getByText('Buzz Newsfeed', { exact: true })).toBeVisible();
    await expect(dashboardPage.page.getByText('Most Recent Posts', { exact: true })).toBeVisible();
    await expect(dashboardPage.page.getByText('QA IS THE FUTURE', { exact: true })).toBeVisible();
  });
});
