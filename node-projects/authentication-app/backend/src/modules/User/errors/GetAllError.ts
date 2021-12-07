// Error
import AppError from '../../../shared/errors/AppError';

export default class GetAllError extends AppError {
  super(message?, statusCode = 500) {
    this.message = message || [
      'An error occurred while get all users, please try again later',
    ];
    this.statusCode = statusCode;
  }
}
