import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const storageStatePath = path.resolve(process.cwd(), 'auth', 'orangehrm.json');
  const baseUrl = process.env.DEMO_BASE_URL || 'https://opensource-demo.orangehrmlive.com';
  const username = process.env.ORANGEHRM_USERNAME || process.env.TEST_USERNAME || 'Admin';
  const password = process.env.ORANGEHRM_PASSWORD || process.env.TEST_PASSWORD || 'admin123';

  await fs.mkdir(path.dirname(storageStatePath), { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`${baseUrl}/web/index.php/auth/login`, { waitUntil: 'domcontentloaded' });
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/dashboard/index');
    await context.storageState({ path: storageStatePath });
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error('Authentication setup failed:', error);
  process.exitCode = 1;
});
