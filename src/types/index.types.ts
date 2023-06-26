import { SocketOptions } from 'dgram';
import { Request, Response, NextFunction } from 'express';
import { ClientSession, ObjectId } from 'mongoose';
// import { ServerOptions } from 'socket.io';

export type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
  session?: ClientSession,
) => Promise<any> | void;

export type MongooseId = ObjectId;

export type EncryptionFunction<T> = (data: T, publicKey?: string) => string;
export type DecryptionFunction<T> = (encryptedId: string, privateKey?: string) => T;

export type ErrorType = 'General' | 'Raw' | 'Validation' | 'Unauthorized';

export type ErrorValidation = { [key: string]: string };

export type ErrorResponse = {
  errorType: ErrorType;
  errorMessage: string;
  errors: string[] | null;
  stack?: string;
  status?: number;
};

export type SocketServerOptions = SocketOptions & {
  cors: {
    origin: string | string[];
    credentials?: boolean;
  };
};

export type SocketCorsOptions = {
  options: string[] | string;
  credentials: boolean;
};

export type AppConfig = {
  mongoURI: string;
  localMongo: string;
  port: string | number;
};

export type SocketConfig = {
  cors: SocketCorsOptions;
};

export type Config = {
  app: AppConfig;
  publicKey: string;
  privateKey: string;
  database: string;
  socket: SocketConfig;
};
