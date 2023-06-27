/* eslint-disable operator-linebreak */
import { Config } from './types/index.types';

const conf: Config = {
  app: {
    mongoURI: 'mongodb://mongo:27017/test',
    localMongo: 'mongodb://127.0.0.1/test',
    remoteMongo: 'mongodb+srv://nees:nees@aitc.buicugl.mongodb.net/boilerplate?retryWrites=true&w=majority',
    port: 3000,
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
