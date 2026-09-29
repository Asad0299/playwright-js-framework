import BasePage from './base_page.js';

export class DashboardPage extends BasePage {
  constructor(page) {
    super(page, '/dashboard');
    this.dashboardHeading = page.getByRole('heading', { name: /dashboard/i });
    this.profileMenu = page.getByRole('button', { name: /profile|account/i });
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
}

export default DashboardPage;
