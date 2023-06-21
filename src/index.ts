import app from '@/app';
import handleProcessEvent from '@/processEvents';
import logger from '@logger/logger';

import http from 'node:http';

const server: http.Server = app.listen(3000, async () => {
  logger.info(`Listening on port 3000 on process id : ${process.pid}`);
});

handleProcessEvent(server);
