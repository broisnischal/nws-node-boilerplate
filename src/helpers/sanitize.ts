import { Request, Response, NextFunction } from 'express';
import { filterInput } from './textFilter';

export const sanitizeString = (str: string): string => filterInput(str);

// Middleware for the app
const sanitizeInput = (req: Request, res: Response, next: NextFunction): void => {
  req.body = Object.entries(req.body).reduce((acc: any, [key, value]) => {
    acc[key] = typeof value === 'string' ? sanitizeString(value) : value;
    return acc;
  }, {});

  next();
};
export default sanitizeInput;
