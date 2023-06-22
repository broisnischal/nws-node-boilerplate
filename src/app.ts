import os from 'node:os';
import express, { Application, NextFunction, Request, Response } from 'express';
import sanitizeInput from '@/helpers/sanitize';
import logger from '@/log/logger';
// import cluster from 'node:cluster';
import errorHandler from '@/utils/errorHandler';
import CreateError from './utils/customError';
import { Code } from './enum/v1/code.enum';
import connectDB from './config/mongoose.config';

const app: Application = express();

(async () => {
  // Connecting to the mongodb
  await connectDB();
})();

app.use(express.json({ limit: '5mb' }));
app.use(sanitizeInput);

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.post('/test', (_req: Request, _res: Response) => {
  //   const additionalParams = { res: 'asdf' };
  //   const response = new HttpResponse(200, 'OK', { test: req.body }, additionalParams);
  //   return res.send(response);
});

app.get('/', (req: Request, res: Response) => {
  const xRealIP = req.headers['x-real-ip'] || req.headers['X-Real-IP'];
  const xForwardedFor = req.headers['x-forwarded-for'] || req.headers['X-Forwarded-For'];
  const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  logger.log('info', `X-Real-IP: ${xRealIP}, client ip address ${clientIP}`);

  res.send({
    message: 'Hello World',
    hostname: os.hostname(),
    process: process.pid,
    xRealIP,
    xForwardedFor,
  });

  // cluster.worker?.kill();
});

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.get('*', (req: Request, res: Response, next: NextFunction) => {
  throw new CreateError('Request error, Not found!', 'Raw', Code.NOT_FOUND);
});

app.use(errorHandler);

export default app;
