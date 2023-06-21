import app from '@/app';
import handleProcessEvent from '@/processEvents';
import logger from '@logger/logger';

import http from 'node:http';
// import redisClient from './config/redis.config';
// import connectDB from './config/mongoose.config';

const server: http.Server = app.listen(3000, async () => {
  // await redisClient.connect();
  // await connectDB();
  logger.info(`Listening on port 3000 on process id : ${process.pid}`);
});

handleProcessEvent(server);
