import BasePage from './base_page.js';

export class RecruitmentPage extends BasePage {
  constructor(page) {
    super(page, '/web/index.php/recruitment/viewRecruitmentModule');
    this.pageHeading = page.getByRole('heading', { name: /recruitment/i });
    this.candidateTable = page.locator('.oxd-table');
  }

  async open() {
    await this.navigate(this.path);
    return this;
  }

  async isRecruitmentPageDisplayed() {
    return this.pageHeading.isVisible();
  }
}

export default RecruitmentPage;
