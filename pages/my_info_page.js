import BasePage from './base_page.js';

export class MyInfoPage extends BasePage {
  constructor(page) {
    super(page, '/web/index.php/pim/viewMyDetails');
    this.pageHeading = page.getByRole('heading', { name: /my info/i });
    this.personalDetailsSection = page.locator('h6').filter({ hasText: 'Personal Details' });
  }

  async open() {
    await this.navigate(this.path);
    return this;
  }

  async isMyInfoPageDisplayed() {
    return this.pageHeading.isVisible();
  }
}

export default MyInfoPage;
