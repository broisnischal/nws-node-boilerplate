import cron from 'node-cron';
import backupDb from '@/mongoBackup';

cron.schedule('*/5 * * * * *', () => {
  backupDb();
});

// Every night at 00:00
cron.schedule('0 0 * * *', () => {
  backupDb();
});
