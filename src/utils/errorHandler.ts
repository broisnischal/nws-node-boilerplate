/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
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

  let error: CustomError = {
    name: err.name || 'Unknown',
    status: err.status || 500,
    message: err.message || 'Something went wrong',
    ...(err.data && { data: err.data }),
  };

  if (err.name === 'ValidationError') {
    error = {
      name: 'ValidationError',
      status: 400,
      message: err.message,
      data: err.data,
    };
  } else if (err.name === 'CastError') {
    error = {
      name: 'CastError',
      status: 400,
      message: err.message,
      data: err.data,
    };
  }

  const errorResponse = {
    status: error.status,
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    data: error.data,
  };

  return res.status(statusCode).json(errorResponse);
};

export default errorHandler;
