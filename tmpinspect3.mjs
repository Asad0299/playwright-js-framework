import { chromium } from '@playwright/test';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
await page.getByPlaceholder('Username').fill('Admin');
await page.getByPlaceholder('Password').fill('admin123');
await page.getByRole('button', { name: 'Login' }).click();
await page.waitForURL('**/dashboard/index', { timeout: 20000 });
const buzz = page.locator('.oxd-sheet').filter({ hasText: 'Buzz Latest Posts' }).first();
console.log('buzz visible', await buzz.isVisible());
console.log('button count', await buzz.locator('button').count());
console.log('svg count', await buzz.locator('svg').count());
console.log('all inner text sample');
console.log(await buzz.innerText());
for (let i = 0; i < await buzz.locator('*').count(); i++) {
  const el = buzz.locator('*').nth(i);
  const tag = await el.evaluate(e => e.tagName);
  const cls = await el.evaluate(e => e.className || '');
  const txt = (await el.textContent())?.trim() || '';
  if (tag === 'BUTTON' || tag === 'svg' || tag === 'DIV' || tag === 'SPAN' || tag === 'P' || tag === 'IMG') {
    console.log(i, tag, JSON.stringify(cls), JSON.stringify(txt.slice(0,80)) );
  }
}
await browser.close();
