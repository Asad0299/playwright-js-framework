import { getLogLevel } from '../config/environments.js';

const levelMap = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const currentLevel = levelMap[getLogLevel()] ?? levelMap.info;

function write(level, message, meta = {}) {
  if (levelMap[level] === undefined || levelMap[level] > currentLevel) {
    return;
  }

  const timestamp = new Date().toISOString();
  const payload = meta && Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
  console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}${payload}`);
}

export const logger = {
  error: (message, meta) => write('error', message, meta),
  warn: (message, meta) => write('warn', message, meta),
  info: (message, meta) => write('info', message, meta),
  debug: (message, meta) => write('debug', message, meta),
};

export default logger;
