import { ValidationError } from 'fastest-validator';

export default class AppError {
  public message:
    | string[]
    | ValidationError[]
    | Promise<true | ValidationError[]>;

  public statusCode: number;

  constructor(message?, statusCode = 500) {
    this.message = message || ['An error occurred, please try again later'];
    this.statusCode = statusCode;
  }
}
