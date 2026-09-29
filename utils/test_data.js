import fs from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();

export async function loadJsonFile(relativePath) {
  const filePath = path.join(projectRoot, relativePath);
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function loadTestUsers() {
  return loadJsonFile('test-data/users.json');
}

export async function loadLoginData() {
  return loadJsonFile('test-data/login-data.json');
}

export default {
  loadJsonFile,
  loadTestUsers,
  loadLoginData,
};
