import os from 'node:os';
import express, { Application, Request, Response } from 'express';
import sanitizeInput from '@/helpers/sanitize';
import logger from './log/logger';

const app: Application = express();

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

  // what

  res.send({
    message: 'Hello World',
    hostname: os.hostname(),
    process: process.pid,
    xRealIP,
    xForwardedFor,
  });
});

export default app;
