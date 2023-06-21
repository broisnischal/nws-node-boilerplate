// import logger from '@/log/logger';
// import { createClient } from 'redis';

// const redisClient = createClient({
//   url: process.env.REDIS_URL,
//   legacyMode: true,
// });

// // eslint-disable-next-line no-unused-vars
// redisClient.on('error', (_err) => {
//   // logger.error('error', err);
// });

// redisClient.on('connect', () => {
//   logger.log('info', 'Redis connected');
// });

// process.on('SIGINT', () => {
//   redisClient.quit();
// });

// export default redisClient;
