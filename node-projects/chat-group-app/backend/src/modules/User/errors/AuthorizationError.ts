// Error
import AppError from '../../../shared/errors/AppError';

export default class AuthorizationError extends AppError {
  super(message?, statusCode = 401) {
    this.message = message || [
      'An error occurred during the authorization, please try again later.',
    ];
    this.statusCode = statusCode;
  }
}
