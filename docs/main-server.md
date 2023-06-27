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
import { startMetricsServer } from './utils/merits';

dotenv.config({ path: path.join(__dirname, '.env') });

const TRY_RESTART = 10;
let triedRestart = 0;
const workers: Worker[] = [];

function spawnWorker() {
  const worker = cluster.fork();
  workers.push(worker);

  worker.on('exit', (code: number, signal: string) => {
    const workerIndex = workers.indexOf(worker);
    if (workerIndex !== -1) {
      workers.splice(workerIndex, 1);
    }

    logger.info(`Worker process ${worker.process.pid} exited with code ${code} and signal ${signal}`);
  });
}

// const cpus = os.cpus();
const server: http.Server = http.createServer(app);
// eslint-disable-next-line import/no-mutable-exports
let io: Server | undefined;

if (cluster.isPrimary) {
  // for (let i = 0; i < cpus.length; ++i) {
  //   spawnWorker();
  // }

  cluster.on('exit', (worker: Worker, code: number, signal: string) => {
    logger.info(`Process ${triedRestart}: ${worker.process.pid} died with code ${code} and signal ${signal} 👻`);

    if (triedRestart < TRY_RESTART) {
      triedRestart++;
      spawnWorker();
    } else {
      logger.info(`Worker process has crashed ${TRY_RESTART} times. Exiting process...`);
      server.close();
      process.exit(1);
    }
  });
} else {
  server.listen(conf.app.port, async () => {
    io = startSocketServer(server);
    startMetricsServer();
    handleProcessEvent(server);
  });

  server.once('close', () => {
    logger.info('Server closed gracefully');
  });
}

export { server, io };
