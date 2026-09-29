import BasePage from './base_page.js';

export class DashboardPage extends BasePage {
  constructor(page) {
    super(page, '/web/index.php/dashboard/index');
    this.dashboardHeading = page.getByRole('heading', { name: /dashboard/i });
    this.profileMenu = page.locator('.oxd-userdropdown-tab');
    this.logoutButton = page.getByRole('menuitem', { name: /logout/i });
  }

  async open() {
    await this.navigate(this.path);
    return this;
  }

  async isDashboardDisplayed() {
    return this.dashboardHeading.isVisible();
  }

  async openProfile() {
    await this.profileMenu.click();
  }

  async logout() {
    await this.openProfile();
    await this.logoutButton.click();
  }
}

export default DashboardPage;
