import logger from '@/log/logger';
import address from 'address';
import rateLimit, { MemoryStore } from 'express-rate-limit';

const allowlist = [address.ip()];

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  handler: (req, res) => {
    logger.info('Too many request from ', req.ip);
    return res.sendStatus(429);
  },
  message: 'Too many requests from this IP, please try again in 15 minutes',
  skip: (request) => allowlist.includes(request.ip),
  store: new MemoryStore(),
});

export { limiter };
