/* eslint-disable no-unused-vars */
import asyncHandler from '@/utils/asyncHandler';
import User from '@/models/v1/auth/user.model';
import CreateError from '@/utils/customError';
import { Code } from '@/enum/v1/code.enum';
import authMessage from '@/messages/auth.message';
import HttpResponse from '@/utils/HttpResponse';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const registerUser = asyncHandler(async (req, res, next, session) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (user) {
    return next(new CreateError(authMessage.register.exists, 'General', Code.BAD_REQUEST));
  }

  const newUser = await User.create({ username, password, email });

  return res.send(new HttpResponse(Code.SUCCESS, authMessage.register.success, newUser));
});

export const loginUser = asyncHandler(async (req, _res, _next, _session) => {
  console.log(req);
});
