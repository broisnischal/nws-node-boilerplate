import { Request, Response, NextFunction } from 'express';
import { ClientSession, ObjectId } from 'mongoose';

export type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
  session?: ClientSession,
) => Promise<any> | void;

export type MongooseId = ObjectId;

export type EncryptionFunction<T> = (data: T, publicKey?: string) => string;
export type DecryptionFunction<T> = (encryptedId: string, privateKey?: string) => T;
