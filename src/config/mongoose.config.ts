import mongoose from 'mongoose';
import conf from '@/config.default';
import logger from '@/log/logger';

const connectDB = async (URI?: string): Promise<void> => {
  try {
    await mongoose.connect(URI ?? conf.app.mongoURI, {});
  } catch (error: any) {
    logger.error(`Error:", ${error.message}`);
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
