import { Code } from '@/enum/v1/code.enum';

class HttpResponse {
  public status: number;

  public message: string;

  private timeStamp: string;

  // eslint-disable-next-line max-len
  constructor(status: Code, message: string, private data?: object, additionalParams?: { [key: string]: any }) {
    this.status = status;
    this.message = message;
    if (data) {
      this.data = data;
    }

    this.timeStamp = new Date().toLocaleString();

    Object.assign(this, additionalParams);
  }

  public static success(
    status: number,
    message: string,
    data?: object,
    additionalParams?: { [key: string]: any },
  ): HttpResponse {
    return new HttpResponse(status, message, data, additionalParams);
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}

export default HttpResponse;
