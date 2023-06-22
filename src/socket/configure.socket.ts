import { Server, Socket, ServerOptions } from 'socket.io';
import http from 'node:http';
import { instrument } from '@socket.io/admin-ui';
import conf from '@/config.default';

// eslint-disable-next-line max-len
const startSocketServer = <T extends ServerOptions = ServerOptions>(server: http.Server): Server<T, T> => {
  const io = new Server<T, T>(server, {
    cors: {
      origin: conf.socket.cors.options,
      credentials: conf.socket.cors.credentials,
    },
  });

  //   const redisClient: RedisClient = createClient({ url: 'redis://127.0.0.1:6379' });
  //   const redisAdapter: RedisAdapter = createAdapter(redisClient);
  //   io.adapter(redisAdapter);

  instrument(io, { auth: false, mode: 'development' });

  io.on('connection', (socket: Socket<T>) => {
    console.log(`${socket.id} connected with id ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected with id ${socket.id}`);
    });
  });

  // # announcement
  //   const announcement = io.of<T>('/announcement');
  //   announcement.use(authMiddleware);

  // # comment
  //   const comment = io.of<T>('/comment');
  //   comment.use(authMiddleware);

  return io;
};

export default startSocketServer;
