import BasePage from './base_page.js';

export class NavigationPage extends BasePage {
  constructor(page) {
    super(page, '/web/index.php/dashboard/index');
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.adminLink = page.getByRole('link', { name: 'Admin' });
    this.pimLink = page.getByRole('link', { name: 'PIM' });
    this.leaveLink = page.getByRole('link', { name: 'Leave' });
    this.timeLink = page.getByRole('link', { name: 'Time' });
    this.recruitmentLink = page.getByRole('link', { name: 'Recruitment' });
    this.myInfoLink = page.getByRole('link', { name: 'My Info' });
  }

  async openDashboard() {
    await this.dashboardLink.click();
  }

  async openAdmin() {
    await this.adminLink.click();
  }

  async openPim() {
    await this.pimLink.click();
  }

  async openLeave() {
    await this.leaveLink.click();
  }

  async openTime() {
    await this.timeLink.click();
  }

  async openRecruitment() {
    await this.recruitmentLink.click();
  }

  async openMyInfo() {
    await this.myInfoLink.click();
  }
}

export default NavigationPage;
