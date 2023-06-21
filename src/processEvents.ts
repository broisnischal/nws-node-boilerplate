import http from 'node:http';
import mongoose from 'mongoose';
import redisClient from './config/redis.config';
import logger from './log/logger';

const handleProcessEvent = (server: http.Server): void => {
  process.on('SIGINT', async () => {
    try {
      server.close(() => {
        logger.info('Server closed gracefully');
        process.exit(0);
      });
      await mongoose.connection.close();
      await redisClient.quit();
    } catch (error) {
      logger.error(error);
      process.exit(0);
    }
  });

  process.on('SIGTERM', async () => {
    try {
      server.close(() => {
        logger.info('Server closed gracefully');
        process.exit(0);
      });
      await mongoose.connection.close();
      logger.info('Mongodb connection closed');
      await redisClient.quit();
      logger.info('Redis connection closed');
    } catch (error) {
      logger.error('Error occurred while closing the server:', error);
      process.exit(1);
    }
  });
};

export default handleProcessEvent;
