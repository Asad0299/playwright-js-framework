import BasePage from './base_page.js';

export class AdminPage extends BasePage {
  constructor(page) {
    super(page, '/web/index.php/admin/viewAdminModule');
    this.pageHeading = page.getByRole('heading', { name: /admin/i });
    this.userNameInput = page.locator('input[placeholder*="Type for hints"]').first();
    this.searchButton = page.getByRole('button', { name: /search/i });
    this.resetButton = page.getByRole('button', { name: /reset/i });
    this.userTable = page.locator('.oxd-table');
  }

  async open() {
    await this.navigate(this.path);
    return this;
  }

  async searchUser(username) {
    await this.userNameInput.fill(username);
    await this.searchButton.click();
  }

  async resetSearch() {
    await this.resetButton.click();
  }

  async isAdminPageDisplayed() {
    return this.pageHeading.isVisible();
  }
}

export default AdminPage;
