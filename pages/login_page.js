import BasePage from './base_page.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page, '/web/index.php/auth/login');
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByText(/invalid credentials|required/i);
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

  async isLoginPageDisplayed() {
    return this.usernameInput.isVisible();
  }

  getErrorMessage() {
    return this.errorMessage;
  }
}

export default LoginPage;
