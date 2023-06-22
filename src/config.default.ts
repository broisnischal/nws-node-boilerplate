/* eslint-disable operator-linebreak */
import 'dotenv/config';
import { Config } from './types/index.types';

const conf: Config = {
  app: {
    mongoURI: process.env.MONGO_URI ?? 'mongodb://root:root@mongo:27017/test' ?? 'mongodb://127.0.0.1:27017/test',
    port: process.env.PORT || 8000,
  },
  publicKey: 'thisissuperpublickey',
  privateKey: 'thisisthesuperprivatekey',
  database: 'test',
  socket: {
    cors: {
      options: ['https://admin.socket.io', 'http://192.168.1.102:8888', 'http://localhost:8888'],
      credentials: true,
    },
  },
};

export default conf;

// connect to the mongodb inside the docker container
// mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}:${mongoPort}/${databaseName}
