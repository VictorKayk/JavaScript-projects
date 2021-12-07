// Error
import AppError from '../../../shared/errors/AppError';

export default class ModeratorError extends AppError {
  super(message?, statusCode = 500) {
    this.message = message || [
      'An error occurred while editing the moderators, please try again later',
    ];
    this.statusCode = statusCode;
  }
}
