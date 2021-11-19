// Error
import AppError from '../../../shared/errors/AppError';

export default class SendMessageError extends AppError {
  super(message?, statusCode = 401) {
    this.message = message || [
      'An error occurred while send a message, please try again later.',
    ];
    this.statusCode = statusCode;
  }
}
