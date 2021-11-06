// Error
import AppError from '../AppError';

export default class RegisterError extends AppError {
  super(
    message = 'An error occurred during the register, please try again later',
    statusCode = 500,
  ) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
