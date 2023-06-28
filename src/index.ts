/* eslint-disable no-plusplus */
import dotenv from 'dotenv';
import path from 'node:path';
import app from '@/app';
import handleProcessEvent from '@/processEvents';
import logger from '@logger/logger';
import '@/cronjobs';
import { Server } from 'socket.io';
import cluster, { Worker } from 'cluster';
// import os from 'os';
import http from 'http';
import conf from './config.default';
import startSocketServer from './socket/configure.socket';
// import connectDB from './config/mongoose.config';

dotenv.config({ path: path.join(__dirname, '.env') });

const TRY_RESTART = 10;
let triedRestart = 0;

// const cpus = os.cpus();
const server: http.Server = http.createServer(app);
// eslint-disable-next-line import/no-mutable-exports
let io: Server | undefined;

if (cluster.isPrimary) {
  cluster.fork();

  cluster.on('exit', (worker: Worker, code: number, signal: string) => {
    logger.info(`Process ${triedRestart}: ${worker.process.pid} died with code ${code} and signal ${signal} 👻`);

    if (triedRestart < TRY_RESTART) {
      triedRestart++;
      cluster.fork();
    } else {
      logger.info(`Worker process has crashed ${TRY_RESTART} times. Exiting process...`);
      server.close();
      process.exit(1);
    }
  });
} else {
  server.listen(conf.app.port, async () => {
    logger.info(`Database connected and started at http://localhost:${conf.app.port}`);
  });

  io = startSocketServer(server);

  server.once('close', () => {
    logger.info('Server closed gracefully');
  });
}

handleProcessEvent(server);

export { server, io };
