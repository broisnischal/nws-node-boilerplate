import conf from '@/config.default';
import logger from '@/log/logger';
import { createClient } from 'redis';

const redisClient = createClient({
  url: conf.app.redisURI,
  legacyMode: true,
});

// eslint-disable-next-line no-unused-vars
redisClient.on('error', (err) => {
  logger.error('error', err);
});

redisClient.on('connect', () => {
  logger.log('info', 'Redis connected');
});

process.on('SIGINT', () => {
  redisClient.quit();
});

export default redisClient;
