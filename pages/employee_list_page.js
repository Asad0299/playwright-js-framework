import BasePage from './base_page.js';

export class EmployeeListPage extends BasePage {
  constructor(page) {
    super(page, '/web/index.php/pim/viewEmployeeList');
    this.employeeTable = page.locator('.oxd-table');
    this.resultsText = page.locator('.oxd-text--span').first();
  }

  async open() {
    await this.navigate(this.path);
    return this;
  }

  async isEmployeeListDisplayed() {
    return this.employeeTable.isVisible();
  }
}

export default EmployeeListPage;
