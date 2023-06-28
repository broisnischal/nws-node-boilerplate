import os from 'node:os';
import express, { Application, NextFunction, Request, Response } from 'express';
import sanitizeInput from '@/helpers/sanitize';
import logger from '@/log/logger';
import errorHandler from '@/utils/errorHandler';
import routes from '@/routes/routes';
import CreateError from '@/utils/customError';
import { Code } from '@/enum/v1/code.enum';
import conf from '@/config.default';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import helmet from 'helmet';
import responseTime from 'response-time';
import compresssion from 'compression';
import morgan from 'morgan';
import path from 'node:path';
import connectDB from './config/mongoose.config';
// import moment from 'moment';

const app: Application = express();
(async () => {
  await connectDB(conf.app.remoteMongo);
})();

const sessionData = {
  store: MongoStore.create({ mongoUrl: conf.app.mongoURI, ttl: 86400000 }),
  secret: conf.session.secret,
  resave: conf.session.resave,
  saveUninitialized: conf.session.saveUninitialized,
  cookie: {
    secure: conf.session.cookie.secure,
    httpOnly: conf.session.cookie.httpOnly,
    originalMaxAge: conf.session.cookie.maxAge,
  },
};

app.use(session({ ...sessionData }));

if (app.get('env') === 'production') {
  app.enable('trust proxy');
}

app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 0);
app.use(express.json({ limit: '50kb' }));
app.use(sanitizeInput);
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(express.urlencoded({ extended: true }));
app.use(responseTime());
app.disable('etag').disable('x-powered-by');
app.use(compresssion());
app.use(morgan('x-request-id : :url with :method from  :remote-addr :remote-user :response-time ms '));

app.get('/', (req: Request, res: Response) => {
  const xRealIP = req.headers['x-real-ip'] || req.headers['X-Real-IP'];
  const xForwardedFor = req.headers['x-forwarded-for'] || req.headers['X-Forwarded-For'];
  const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  logger.log('info', `X-Real-IP: ${xRealIP}, client ip address ${clientIP}`);

  res.send({
    message: 'Hello World',
    hostname: os.hostname(),
    process: process.pid,
    xRealIP,
    xForwardedFor,
  });

  // cluster.worker?.kill();
});

// -----------------@ routing
app.use('/api', routes);

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.get('*', (req: Request, res: Response, next: NextFunction) => {
  throw new CreateError('Request error, Not found!', 'Raw', Code.NOT_FOUND);
});

app.use(errorHandler);

export default app;
