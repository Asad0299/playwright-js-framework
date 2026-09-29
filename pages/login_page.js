import BasePage from './base_page.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page, '/login');
    this.usernameInput = page.getByLabel(/username|email/i).or(page.getByPlaceholder(/username|email/i));
    this.passwordInput = page.getByLabel(/password/i).or(page.getByPlaceholder(/password/i));
    this.loginButton = page.getByRole('button', { name: /login/i });
    this.errorMessage = page.getByRole('alert').or(page.locator('[data-testid="error-message"]'));
  }

  async open() {
    await this.navigate(this.path);
    await this.usernameInput.waitFor({ state: 'visible' });
    return this;
  }

  async enterUsername(username = '') {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password = '') {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  getErrorMessage() {
    return this.errorMessage;
  }
}

export default LoginPage;
