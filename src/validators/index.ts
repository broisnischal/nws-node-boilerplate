import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';

const validate = (req: Request, res: Response, next: NextFunction): unknown => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: { [key: string]: string }[] = [];
  errors.array().map((err: ValidationError) => extractedErrors.push({ [err.type]: err.msg }));

  // throw new APPError("Validation failed", 422, extractedErrors);

  return res.status(422).send({
    message: 'Validation failed',
    error: true,
    errors: extractedErrors,
    data: errors.array(),
  });
};

export default validate;
