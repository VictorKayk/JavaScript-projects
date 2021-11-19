// Error
import AppError from '../../../shared/errors/AppError';

export default class CreateChannelError extends AppError {
  super(message?, statusCode = 401) {
    this.message = message || [
      'An error occurred while the channel creation, please try again later.',
    ];
    this.statusCode = statusCode;
  }
}
