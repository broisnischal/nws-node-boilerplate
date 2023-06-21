import { Code } from '@/enum/v1/code.enum';

class CreateError extends Error {
  public statusCode: number;

  public message: string;

  public data?: any;

  constructor(message: string, status: Code, data?: unknown) {
    super(message);
    this.statusCode = status;
    this.message = message;
    if (data) {
      this.data = data;
    }
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CreateError;
