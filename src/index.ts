import dotenv from 'dotenv';
import app from '@/app';
import handleProcessEvent from '@/processEvents';
import logger from '@logger/logger';
import '@/cronjobs';
import { Server } from 'socket.io';
import http from 'node:http';
import conf from './config.default';
import startSocketServer from './socket/configure.socket';

dotenv.config();

const server: http.Server = app.listen(conf.app.port, async () => {
  logger.info(`Listening on port ${conf.app.port} on process id: ${process.pid}`);
});

export const io: Server = startSocketServer(server);

handleProcessEvent(server);
