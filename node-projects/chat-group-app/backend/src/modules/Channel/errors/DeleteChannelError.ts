// Error
import AppError from '../../../shared/errors/AppError';

export default class DeleteChannelError extends AppError {
  super(message?, statusCode = 401) {
    this.message = message || [
      'An error occurred while deleting the channel, please try again later.',
    ];
    this.statusCode = statusCode;
  }
}
