import { MongooseError } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
// import { Code } from '@/enum/v1/code.enum';

interface CustomError extends Error, MongooseError {
  status: number;
  data?: object;
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (err: CustomError, req: Request, res: Response, _next: NextFunction): any => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  console.log(err);
  const errorResponse = {
    status: err.status || 500,
    message: err.message || 'Something went wrong',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    data: err.data,
  };

  return res.status(statusCode).json(errorResponse);
};

export default errorHandler;
