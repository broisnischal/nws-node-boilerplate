class HttpResponse {
  public status: number;

  public message: string;

  public data?: any;

  constructor(
    status: number,
    message: string,
    data?: object | null | unknown,
    additionalParams?: { [key: string]: any },
  ) {
    this.status = status;
    this.message = message;
    this.data = data;

    Object.assign(this, additionalParams);
  }

  public static success(
    status: number,
    message: string,
    data?: object | null | unknown,
    additionalParams?: { [key: string]: any },
  ): HttpResponse {
    return new HttpResponse(status, message, data, additionalParams);
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}

export default HttpResponse;
