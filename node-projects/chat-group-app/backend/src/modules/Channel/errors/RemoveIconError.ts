// Error
import AppError from '../../../shared/errors/AppError';

export default class RemoveIconError extends AppError {
  super(message?, statusCode = 401) {
    this.message = message || [
      'An error occurred during the removing of the channel icon, please try again later.',
    ];
    this.statusCode = statusCode;
  }
}
