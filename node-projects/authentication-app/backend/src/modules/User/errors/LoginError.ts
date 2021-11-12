// Error
import AppError from '../../../shared/errors/AppError';

export default class LoginError extends AppError {
  super(message?, statusCode = 500) {
    this.message = message || [
      'An error occurred during the login, please try again later',
    ];
    this.statusCode = statusCode;
  }
}
