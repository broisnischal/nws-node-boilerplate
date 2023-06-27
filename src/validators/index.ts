// import { Code } from '@/enum/v1/code.enum';
// import CreateError from '@/utils/customError';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

const validate = (req: Request, res: Response, next: NextFunction): unknown => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: any = [];
  errors.array().map((err: any) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).send({
    message: 'Validation failed',
    errors: extractedErrors,
    error: true,
    data: errors.array(),
  });

  // throw new CreateError("Validation failed", "Validation", Code.BAD_REQUEST, extractedErrors, errors.array());
};

export default validate;
