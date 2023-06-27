import { Router } from 'express';
import userAuthRouter from './auth/user.auth.routes';

const v1 = Router();

v1.use('/auth/user', userAuthRouter);

export default v1;
