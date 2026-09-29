import { chromium } from '@playwright/test';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
await page.getByPlaceholder('Username').fill('Admin');
await page.getByPlaceholder('Password').fill('admin123');
await page.getByRole('button', { name: 'Login' }).click();
await page.waitForURL('**/dashboard/index', { timeout: 20000 });
const buzz = page.locator('.oxd-sheet').filter({ hasText: 'Buzz Latest Posts' }).first();
console.log('buzz visible?', await buzz.isVisible());
console.log('buzz count', await page.locator('.oxd-sheet').filter({ hasText: 'Buzz Latest Posts' }).count());
console.log('all buttons in buzz section', await buzz.locator('button').count());
for (let i = 0; i < await buzz.locator('button').count(); i++) {
  const b = buzz.locator('button').nth(i);
  console.log('button', i, JSON.stringify(await b.evaluate(el => ({ tag: el.tagName, text: el.textContent.trim(), className: el.className, ariaLabel: el.getAttribute('aria-label'), title: el.getAttribute('title') }))));
}
const profile = page.locator('.oxd-userdropdown-tab');
console.log('profile count', await profile.count());
for (let i = 0; i < await profile.count(); i++) {
  const p = profile.nth(i);
  console.log('profile', i, JSON.stringify(await p.evaluate(el => ({ tag: el.tagName, text: el.textContent.trim(), className: el.className, ariaLabel: el.getAttribute('aria-label'), title: el.getAttribute('title') }))));
}
await browser.close();
