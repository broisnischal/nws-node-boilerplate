import app from '@/app';
import handleProcessEvent from '@/processEvents';
import logger from '@logger/logger';

import http from 'node:http';
import conf from './config.default';

const server: http.Server = app.listen(conf.app.port, async () => {
  logger.info(`Listening on port ${conf.app.port} on process id : ${process.pid}`);
});

handleProcessEvent(server);
