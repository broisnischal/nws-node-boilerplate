import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import fs from 'node:fs';
import path from 'node:path';

const privateKey = fs.readFileSync(path.join(__dirname, './private.key'));
const publicKey = fs.readFileSync(path.join(__dirname, './public.key'));

const defaultOptions: SignOptions = {
  algorithm: 'RS256',
  issuer: process.env.JWT_ISSUER || 'neeswebservices',
};

const generate = (payload: object, options?: SignOptions, privateKeyOverride?: Buffer): string => {
  const key = privateKeyOverride || privateKey;
  const optionsToUse = { ...defaultOptions, ...options };
  return jwt.sign(payload, key, optionsToUse);
};

const verify = (token: string, publicKeyOverride?: Buffer, options?: VerifyOptions): any => {
  const keyToUse = publicKeyOverride || publicKey;
  return jwt.verify(token, keyToUse, options);
};

const Token = {
  generate,
  verify,
};

export default Token;
