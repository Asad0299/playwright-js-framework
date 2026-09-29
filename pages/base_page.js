import { getBaseUrl } from '../config/environments.js';

export class BasePage {
  constructor(page, path = '/') {
    this.page = page;
    this.path = path.startsWith('/') ? path : `/${path}`;
    this.baseUrl = getBaseUrl();
  }

  async navigate(pagePath = this.path) {
    const target = pagePath.startsWith('http') ? pagePath : `${this.baseUrl}${pagePath}`;
    await this.page.goto(target, { waitUntil: 'domcontentloaded' });
    await this.waitForPageLoad();
    return this.page;
  }

  async getTitle() {
    return this.page.title();
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async click(locator, options = {}) {
    await locator.click(options);
  }

  async fill(locator, value) {
    await locator.fill(value);
  }

  async isVisible(locator) {
    return locator.isVisible();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }
}

export default BasePage;
