// import log from '@/log/logger';
import express, { Request, Response } from 'express';
import client, { Histogram } from 'prom-client';

const app = express();

export const restResponseTimeHistogram: Histogram<string> = new client.Histogram({
  name: 'rest_response_time_duration_seconds',
  help: 'REST API response time in seconds',
  labelNames: ['method', 'route', 'status_code'],
});

export const databaseResponseTimeHistogram: Histogram<string> = new client.Histogram({
  name: 'db_response_time_duration_seconds',
  help: 'Database response time in seconds',
  labelNames: ['operation', 'success'],
});

export function startMetricsServer(port = 9100, endpoint = '/metrics'): void {
  const { collectDefaultMetrics } = client;

  collectDefaultMetrics();

  app.get(endpoint, async (req: Request, res: Response) => {
    res.set('Content-Type', client.register.contentType);

    return res.send(await client.register.metrics());
  });

  app.listen(port, () => {
    // log.info(`Metrics server started at http://localhost:${port}`);
  });
}
