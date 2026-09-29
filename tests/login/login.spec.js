import { test, expect } from '../../fixtures/test.js';
import { loadLoginData } from '../../utils/test_data.js';

const resolveUsername = (data) =>
  data.valid.username || process.env.ORANGEHRM_USERNAME || process.env.TEST_USERNAME || 'Admin';
const resolvePassword = (data) =>
  data.valid.password || process.env.ORANGEHRM_PASSWORD || process.env.TEST_PASSWORD || 'admin123';

test.describe('Login flow', () => {
  test('valid user can login @smoke @regression', async ({ loginPage, dashboardPage }) => {
    const loginData = await loadLoginData();

    await loginPage.open();
    await loginPage.login(
      resolveUsername(loginData),
      resolvePassword(loginData),
    );

    await expect(dashboardPage.dashboardHeading).toBeVisible();
  });

  test('invalid credentials show an error @sanity', async ({ loginPage }) => {
    const loginData = await loadLoginData();

    await loginPage.open();
    await loginPage.login(loginData.invalid.username, loginData.invalid.password);

    await expect(loginPage.getErrorMessage()).toBeVisible();
  });
});
