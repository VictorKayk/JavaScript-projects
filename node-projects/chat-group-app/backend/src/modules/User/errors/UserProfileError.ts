// Error
import AppError from '../../../shared/errors/AppError';

export default class UserProfileError extends AppError {
  super(message?, statusCode = 500) {
    this.message = message || [
      'An error occurred during the profile view, please try again later',
    ];
    this.statusCode = statusCode;
  }
}
