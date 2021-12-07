// Error
import AppError from '../../../shared/errors/AppError';

export default class UpdateProfileError extends AppError {
  super(message?, statusCode = 500) {
    this.message = message || [
      'An error occurred while the profile edit, please try again later',
    ];
    this.statusCode = statusCode;
  }
}
