// Error
import AppError from '../../../shared/errors/AppError';

export default class RemoveAvatarError extends AppError {
  super(message?, statusCode = 401) {
    this.message = message || [
      'An error occurred during the removing of avatar, please try again later.',
    ];
    this.statusCode = statusCode;
  }
}
