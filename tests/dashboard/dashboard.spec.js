import { test, expect } from '../../fixtures/test.js';
import { loadLoginData } from '../../utils/test_data.js';

const resolveUsername = (data) =>
  data.valid.username || process.env.ORANGEHRM_USERNAME || process.env.TEST_USERNAME || 'Admin';
const resolvePassword = (data) =>
  data.valid.password || process.env.ORANGEHRM_PASSWORD || process.env.TEST_PASSWORD || 'admin123';

test.describe('Dashboard', () => {
  async function ensureAuthenticated(loginPage, dashboardPage) {
    const loginData = await loadLoginData();
    const username = resolveUsername(loginData);
    const password = resolvePassword(loginData);

    if (await loginPage.usernameInput.isVisible().catch(() => false)) {
      await loginPage.login(username, password);
    }

    await dashboardPage.open();
  }

  test('user can access profile menu @regression', async ({ loginPage, dashboardPage }) => {
    await ensureAuthenticated(loginPage, dashboardPage);
    await dashboardPage.openProfile();

    await expect(dashboardPage.profileMenu).toBeVisible();
  });

  test('user can open the buzz feed and view recent posts @regression', async ({
    loginPage,
    dashboardPage,
  }) => {
    await ensureAuthenticated(loginPage, dashboardPage);

    const buzzLink = dashboardPage.page.locator('a[href="/web/index.php/buzz/viewBuzz"]').first();
    await expect(buzzLink).toBeVisible();
    await buzzLink.click();

    await expect(dashboardPage.page).toHaveURL(/\/web\/index\.php\/buzz\/viewBuzz/);
    await expect(dashboardPage.page.getByText('Buzz Newsfeed', { exact: true })).toBeVisible();
    await expect(dashboardPage.page.getByText('Most Recent Posts', { exact: true })).toBeVisible();
  });

  test('user can navigate to the time module from the dashboard @regression', async ({
    loginPage,
    dashboardPage,
  }) => {
    await ensureAuthenticated(loginPage, dashboardPage);

    const timeLink = dashboardPage.page.locator('a[href="/web/index.php/time/viewTimeModule"]').first();

    await expect(timeLink).toBeVisible();
    await timeLink.click();

    await expect(dashboardPage.page).toHaveURL(/\/web\/index\.php\/time\/view(EmployeeTimesheet|TimeModule)/);
    await expect(dashboardPage.page.getByRole('heading', { name: 'Time', exact: true })).toBeVisible();
  });
});
