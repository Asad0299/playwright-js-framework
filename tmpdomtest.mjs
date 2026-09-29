import { chromium } from '@playwright/test';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
await page.getByPlaceholder('Username').fill('Admin');
await page.getByPlaceholder('Password').fill('admin123');
await page.getByRole('button', { name: 'Login' }).click();
await page.waitForURL('**/dashboard/index', { timeout: 20000 });
console.log('BROAD LINKS');
for (let i = 0; i < await page.getByRole('link').count(); i++) {
  const loc = page.getByRole('link').nth(i);
  const text = await loc.textContent();
  if ((text || '').trim()) console.log(i, JSON.stringify((text || '').trim()));
}
const timeWidget = page.locator('div').filter({ hasText: 'Time at Work' }).first();
console.log('TIME WIDGET TEXT');
console.log(await timeWidget.innerText());
console.log('TIME WIDGET BUTTONS', await timeWidget.locator('button').count());
for (let i = 0; i < await timeWidget.locator('button').count(); i++) {
  const btn = timeWidget.locator('button').nth(i);
  const attrs = await btn.evaluate(el => ({
    tag: el.tagName,
    text: el.textContent.trim(),
    className: el.className,
    ariaLabel: el.getAttribute('aria-label'),
    title: el.getAttribute('title'),
    innerHTML: el.innerHTML.slice(0, 200)
  }));
  console.log('BTN', i, attrs);
}
console.log('BUZZ LINK COUNT', await page.getByRole('link', { name: 'Buzz' }).count());
console.log('BUZZ TEXT COUNT', await page.getByText('Buzz', { exact: true }).count());
await browser.close();
