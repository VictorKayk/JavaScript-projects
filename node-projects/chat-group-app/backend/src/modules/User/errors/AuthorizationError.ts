// Error
import AppError from '../../../shared/errors/AppError';

export default class AuthorizationError extends AppError {
  super(message?, statusCode = 500) {
    this.message = message || [
      'An authorization error occurred, please try again later',
    ];
    this.statusCode = statusCode;
  }
}
