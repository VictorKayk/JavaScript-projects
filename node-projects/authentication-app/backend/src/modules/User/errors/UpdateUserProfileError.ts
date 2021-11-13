// Error
import AppError from '../../../shared/errors/AppError';

export default class UpdateUserProfileError extends AppError {
  super(message?, statusCode = 500) {
    this.message = message || [
      'An error occurred during the profile edit, please try again later',
    ];
    this.statusCode = statusCode;
  }
}
