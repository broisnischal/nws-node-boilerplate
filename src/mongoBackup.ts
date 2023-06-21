/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { spawn } from 'child_process';
import path from 'node:path';
import conf from '@/config.default';
import logger from '@/log/logger';

// @ Restoring mongodb database
// mongorestore --db=test --gzip --archive=backup/test.gzip

const backupDb = (): void => {
  const { database } = conf;
  const archivePath = path.join(__dirname, 'backup', `${database}.gzip`);
  const child = spawn('mongodump', [`--db=${database}`, `--archive=${archivePath}`, '--gzip']);

  //   child.stdout.pipe(process.stdout);
  child.stdout.on('data', (data) => {
    // console.log('Stdout: \n', Buffer.from(data).toString());
  });
  child.stderr.on('data', (data) => {
    // console.log('stdERR: \n', Buffer.from(data).toString());
  });

  child.on('exit', (code, signal) => {
    if (code) {
      logger.info(`Process exit with code: ${code}`);
    } else if (signal) {
      logger.info(`Process killed with signal: ${signal}`);
    } else {
      logger.info('Mongodb Backup is Successfull ✅');
    }
  });
};

export default backupDb;
