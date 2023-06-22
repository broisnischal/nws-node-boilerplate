import { Code } from '@/enum/v1/code.enum';
import { ErrorResponse, ErrorType } from '@/types/index.types';

class CreateError extends Error {
  public statusCode: Code;

  private errorType: ErrorType;

  public message: string;

  public data?: any;

  private errors: string[] | any;

  // eslint-disable-next-line max-len
  constructor(message: string, errorType: ErrorType, status: Code, errors?: string[], data?: unknown) {
    super(message);
    this.statusCode = status;
    this.message = message;
    this.errorType = errorType;
    if (errors) {
      this.errors = errors;
    }
    if (data) {
      this.data = data;
    }
    Error.captureStackTrace(this, this.constructor);
  }

  get HttpStatusCode(): Code {
    return this.statusCode;
  }

  get JSON(): ErrorResponse {
    return {
      errorMessage: this.message,
      errorType: this.errorType,
      errors: this.errors,
      status: this.statusCode,
      stack: this.stack,
    };
  }
}

export default CreateError;
