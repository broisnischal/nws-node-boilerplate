import { loginUser, registerUser } from '@/controllers/v1/auth';
import userValidation from '@/validators/models/user.validate';
import { Router } from 'express';
import validate from '@/validators';

const userAuthRouter = Router();

userAuthRouter.get('/', async (req, res) => {
  res.send({ message: 'Hello World' });
});

userAuthRouter.post('/', userValidation(), validate, registerUser);
userAuthRouter.post('/login', loginUser);

export default userAuthRouter;
