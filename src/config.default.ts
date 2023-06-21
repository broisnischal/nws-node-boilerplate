const conf = {
  app: {
    mongoURI: process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/test',
    port: process.env.PORT ?? 5000,
  },
  publicKey: 'thisissuperpublickey',
  privateKey: 'thisisthesuperprivatekey',
  database: 'test',
};

export default conf;
