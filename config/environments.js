import dotenv from 'dotenv';

dotenv.config();

const environmentMap = {
  demo: {
    name: 'demo',
    baseUrl: process.env.DEMO_BASE_URL || 'https://opensource-demo.orangehrmlive.com',
    apiBaseUrl: process.env.API_BASE_URL || 'https://opensource-demo.orangehrmlive.com',
  },
  qa: {
    name: 'qa',
    baseUrl: process.env.QA_BASE_URL || 'https://your-qa-app.example.com',
    apiBaseUrl: process.env.API_BASE_URL || 'https://your-api.example.com',
  },
  staging: {
    name: 'staging',
    baseUrl: process.env.STAGING_BASE_URL || 'https://your-staging-app.example.com',
    apiBaseUrl: process.env.API_BASE_URL || 'https://your-api.example.com',
  },
  production: {
    name: 'production',
    baseUrl: process.env.PROD_BASE_URL || 'https://your-prod-app.example.com',
    apiBaseUrl: process.env.API_BASE_URL || 'https://your-api.example.com',
  },
};

export function getEnvironment() {
  const configuredEnvironment = (process.env.ENV || 'demo').toLowerCase();
  return environmentMap[configuredEnvironment] ? configuredEnvironment : 'demo';
}

export function getConfig() {
  const environment = getEnvironment();
  return environmentMap[environment];
}

export function getBaseUrl() {
  return getConfig().baseUrl;
}

export function getApiBaseUrl() {
  return getConfig().apiBaseUrl;
}

export function getBrowserName() {
  const configuredBrowser = (process.env.BROWSER || 'chromium').toLowerCase();
  return ['chromium', 'firefox', 'webkit'].includes(configuredBrowser)
    ? configuredBrowser
    : 'chromium';
}

export function getLogLevel() {
  const level = (process.env.LOG_LEVEL || 'info').toLowerCase();
  return ['error', 'warn', 'info', 'debug'].includes(level) ? level : 'info';
}

export default {
  environmentMap,
  getEnvironment,
  getConfig,
  getBaseUrl,
  getApiBaseUrl,
  getBrowserName,
  getLogLevel,
};
