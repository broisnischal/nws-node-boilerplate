import redisClient from '@/config/redis.config';
import { promisify } from 'node:util';

export const getAsync = promisify(redisClient.get).bind(redisClient);
export const setAsync = promisify(redisClient.set).bind(redisClient);

const setVal = (key: string, value: string): void => {
  redisClient.set(key, value);
};

const setValue = async <T>(key: string, value: T): Promise<void> => {
  const serializedValue = JSON.stringify(value);
  await setAsync(key, serializedValue);
};

const getValue = async <T>(key: string): Promise<T | null> => {
  const data: string | null = await getAsync(key);
  return data !== null ? JSON.parse(data) : null;
};

export { setValue, getValue, setVal };
