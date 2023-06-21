/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { ClientSession } from 'mongoose';

export type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
  session?: ClientSession,
) => Promise<any> | void;
