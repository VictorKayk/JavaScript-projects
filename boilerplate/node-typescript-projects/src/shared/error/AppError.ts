export default class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message = 'An error occurred please try again later', statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
