import dotenv from 'dotenv';

dotenv.config();

const environmentMap = {
  qa: {
    name: 'qa',
    baseUrl: process.env.QA_BASE_URL || 'https://example-qa.com',
    apiBaseUrl: process.env.API_BASE_URL || 'https://example-api.com',
  },
  staging: {
    name: 'staging',
    baseUrl: process.env.STAGING_BASE_URL || 'https://example-staging.com',
    apiBaseUrl: process.env.API_BASE_URL || 'https://example-api.com',
  },
  production: {
    name: 'production',
    baseUrl: process.env.PROD_BASE_URL || 'https://example-prod.com',
    apiBaseUrl: process.env.API_BASE_URL || 'https://example-api.com',
  },
};

export function getEnvironment() {
  const configuredEnvironment = (process.env.ENV || 'qa').toLowerCase();
  return environmentMap[configuredEnvironment] ? configuredEnvironment : 'qa';
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
