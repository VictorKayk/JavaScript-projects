// Error
import AppError from '../../../shared/errors/AppError';

export default class GetChannelError extends AppError {
  super(message?, statusCode = 401) {
    this.message = message || [
      'An error occurred while the get of the channel, please try again later.',
    ];
    this.statusCode = statusCode;
  }
}
