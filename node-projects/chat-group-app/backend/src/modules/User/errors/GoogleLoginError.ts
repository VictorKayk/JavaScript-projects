// Error
import AppError from '../../../shared/errors/AppError';

export default class GoogleLoginError extends AppError {
  super(message?, statusCode = 500) {
    this.message = message || [
      'An error occurred while the google login, please try again later',
    ];
    this.statusCode = statusCode;
  }
}
