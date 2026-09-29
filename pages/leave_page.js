import BasePage from './base_page.js';

export class LeavePage extends BasePage {
  constructor(page) {
    super(page, '/web/index.php/leave/viewLeaveModule');
    this.pageHeading = page.getByRole('heading', { name: /leave/i });
    this.leaveTable = page.locator('.oxd-table');
  }

  async open() {
    await this.navigate(this.path);
    return this;
  }

  async isLeavePageDisplayed() {
    return this.pageHeading.isVisible();
  }
}

export default LeavePage;
