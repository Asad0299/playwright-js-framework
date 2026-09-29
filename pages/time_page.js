import BasePage from './base_page.js';

export class TimePage extends BasePage {
  constructor(page) {
    super(page, '/web/index.php/time/viewTimeModule');
    this.pageHeading = page.getByRole('heading', { name: /time/i });
    this.timeSheetTable = page.locator('.oxd-table');
  }

  async open() {
    await this.navigate(this.path);
    return this;
  }

  async isTimePageDisplayed() {
    return this.pageHeading.isVisible();
  }
}

export default TimePage;
