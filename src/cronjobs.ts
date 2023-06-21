import cron from 'node-cron';
import backupDb from '@/mongoBackup';

// Every night at 00:00
cron.schedule('0 0 * * *', () => {
  backupDb();
});
