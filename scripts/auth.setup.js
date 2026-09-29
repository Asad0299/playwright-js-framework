import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const storageStatePath = path.resolve(process.cwd(), 'auth', 'user.json');
  const baseUrl = process.env.QA_BASE_URL || 'https://example-qa.com';
  const username = process.env.TEST_USERNAME || 'demo.user';
  const password = process.env.TEST_PASSWORD || 'demo.password';

  await fs.mkdir(path.dirname(storageStatePath), { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`${baseUrl}/login`, { waitUntil: 'domcontentloaded' });
    await page.getByLabel(/username|email/i).fill(username);
    await page.getByLabel(/password/i).fill(password);
    await page.getByRole('button', { name: /login/i }).click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: storageStatePath });
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error('Authentication setup failed:', error);
  process.exitCode = 1;
});
