// Error
import AppError from '../../../shared/errors/AppError';

export default class GetProfileError extends AppError {
  super(message?, statusCode = 500) {
    this.message = message || [
      'An error occurred while the profile view, please try again later',
    ];
    this.statusCode = statusCode;
  }
}
