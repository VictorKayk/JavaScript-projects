// Error
import AppError from '../../../shared/errors/AppError';

export default class Get10ChannelsError extends AppError {
  super(message?, statusCode = 401) {
    this.message = message || [
      'An error occurred while get all channels, please try again later.',
    ];
    this.statusCode = statusCode;
  }
}
