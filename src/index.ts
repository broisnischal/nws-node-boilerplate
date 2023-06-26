/* eslint-disable no-plusplus */
import dotenv from 'dotenv';
import app from '@/app';
import handleProcessEvent from '@/processEvents';
import logger from '@logger/logger';
import '@/cronjobs';
import { Server } from 'socket.io';
import cluster from 'node:cluster';
import os from 'node:os';
import http from 'node:http';
import conf from './config.default';
import startSocketServer from './socket/configure.socket';
import { startMetricsServer } from './utils/merits';

dotenv.config();

const TRY_RESTART = 10;
let triedRestart = 0;

const cpus = os.cpus();
const server: http.Server = http.createServer(app);
// eslint-disable-next-line import/no-mutable-exports
let io: Server | undefined;

if (cluster.isPrimary) {
  // const worker = cluster.fork();

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < cpus.length; ++i) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    logger.info(`Process ${triedRestart}: ${worker.process.pid} died with code ${code} and signal ${signal} 👻`);

    if (triedRestart < TRY_RESTART) {
      triedRestart++;
      cluster.fork();
    } else {
      logger.info(`Worker process has crashed ${TRY_RESTART} times, Exiting process...`);
      server.close();
      process.exit(1);
    }
  });
} else {
  // triedRestart = 0;
  server.listen(conf.app.port, async () => {
    logger.info(`Listening on port ${conf.app.port} on process id: ${process.pid}`);
    io = startSocketServer(server);
    handleProcessEvent(server);
    startMetricsServer();
  });
}

export { io, server };
// export const io: Server = startSocketServer(server);

// const server: http.Server = app.listen(conf.app.port, async () => {
//   logger.info(`Listening on port ${conf.app.port} on process id: ${process.pid}`);
// });
