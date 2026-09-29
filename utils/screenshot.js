import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

export async function takeScreenshot(page, fileName, options = {}) {
  const screenshotDir = path.join(projectRoot, 'test-results', 'screenshots');
  await fs.mkdir(screenshotDir, { recursive: true });

  const safeName = fileName.replace(/[^a-z0-9-_]+/gi, '-').toLowerCase();
  const destination = path.join(screenshotDir, `${safeName}.png`);

  await page.screenshot({
    path: destination,
    fullPage: options.fullPage ?? false,
  });

  return destination;
}

export async function attachFailureArtifact(page, fileName) {
  return takeScreenshot(page, fileName, { fullPage: true });
}

export default {
  takeScreenshot,
  attachFailureArtifact,
};
