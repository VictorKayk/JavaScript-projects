export default class AppError {
  public message: string | string[];

  public statusCode: number;

  constructor(
    message = 'An error occurred, please try again later',
    statusCode = 500,
  ) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
