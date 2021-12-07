// Error
import AppError from '../../../shared/errors/AppError';

export default class AdminError extends AppError {
  super(message?, statusCode = 500) {
    this.message = message || [
      'An error occurred with the admin, please try again later',
    ];
    this.statusCode = statusCode;
  }
}
