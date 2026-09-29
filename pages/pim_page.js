import BasePage from './base_page.js';

export class PimPage extends BasePage {
  constructor(page) {
    super(page, '/web/index.php/pim/viewPimModule');
    this.pageHeading = page.getByRole('heading', { name: /pim/i });
    this.employeeNameInput = page.locator('input[placeholder*="Type for hints"]').first();
    this.employeeIdInput = page.locator('input[placeholder*="Employee Id"]').first();
    this.searchButton = page.getByRole('button', { name: /search/i });
    this.resetButton = page.getByRole('button', { name: /reset/i });
  }

  async open() {
    await this.navigate(this.path);
    return this;
  }

  async searchByEmployeeName(name) {
    await this.employeeNameInput.fill(name);
    await this.searchButton.click();
  }

  async searchByEmployeeId(employeeId) {
    await this.employeeIdInput.fill(employeeId);
    await this.searchButton.click();
  }

  async resetSearch() {
    await this.resetButton.click();
  }

  async isPimPageDisplayed() {
    return this.pageHeading.isVisible();
  }
}

export default PimPage;
