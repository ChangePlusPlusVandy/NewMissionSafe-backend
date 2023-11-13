import { HttpStatus } from "http-status-ts";

export class HttpError extends Error {
  errorCode: HttpStatus;

  constructor(errorCode: HttpStatus, message: string, options?: ErrorOptions) {
    super(message, options);
    this.errorCode = errorCode;
    this.name = this.constructor.name;
  }
}