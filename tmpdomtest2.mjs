import { chromium } from '@playwright/test';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
await page.getByPlaceholder('Username').fill('Admin');
await page.getByPlaceholder('Password').fill('admin123');
await page.getByRole('button', { name: 'Login' }).click();
await page.waitForURL('**/dashboard/index', { timeout: 20000 });
const buttons = await page.locator('button').evaluateAll(els => els.map(el => ({
  text: el.textContent.trim(),
  className: el.className,
  title: el.getAttribute('title'),
  ariaLabel: el.getAttribute('aria-label'),
  innerHTML: el.innerHTML.slice(0, 200),
  containsClock: (el.innerHTML.includes('clock') || el.innerHTML.includes('bi-clock') || el.innerHTML.includes('oxd-icon') || el.outerHTML.toLowerCase().includes('clock'))
})));
console.log(JSON.stringify(buttons, null, 2));
await browser.close();
