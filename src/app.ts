import os from 'node:os';
import express, { Application, Request, Response } from 'express';
import sanitizeInput from '@/helpers/sanitize';

const app: Application = express();

app.use(express.json({ limit: '5mb' }));
app.use(sanitizeInput);

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.post('/test', (_req: Request, _res: Response) => {
  //   const additionalParams = { res: 'asdf' };
  //   const response = new HttpResponse(200, 'OK', { test: req.body }, additionalParams);
  //   return res.send(response);
});

app.get('/', (_req: Request, res: Response) => {
  res.send({
    message: 'Hello World',
    hostname: os.hostname(),
    process: process.pid,
  });
});

export default app;
