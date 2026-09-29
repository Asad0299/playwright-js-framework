import BasePage from './base_page.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page, '/');
    this.pageHeading = page.getByRole('heading', { name: /home|welcome/i });
    this.dashboardLink = page.getByRole('link', { name: /dashboard/i });
    this.logoutButton = page.getByRole('button', { name: /logout/i });
  }

  async open() {
    await this.navigate(this.path);
    return this;
  }

  async openDashboard() {
    await this.dashboardLink.click();
  }

  async logout() {
    await this.logoutButton.click();
  }

  async isHomePageDisplayed() {
    return this.pageHeading.isVisible();
  }
}

export default HomePage;
