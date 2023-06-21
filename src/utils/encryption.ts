import conf from '@/config.default';
import { DecryptionFunction, EncryptionFunction } from '@/types/index.types';
import crypto from 'node:crypto';

const encrypt: EncryptionFunction<any> = (data, publicKey = conf.publicKey) => {
  const buffer = Buffer.from(JSON.stringify(data));
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString('hex');
};

const decrypt: DecryptionFunction<any> = (encryptedId, privateKey = conf.privateKey) => {
  const buffer = Buffer.from(encryptedId, 'hex');
  const decrypted = crypto.privateDecrypt(privateKey, buffer);

  return JSON.parse(decrypted.toString('utf8'));
};

const encryption = {
  encrypt,
  decrypt,
};

export default encryption;
