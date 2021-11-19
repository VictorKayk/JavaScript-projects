// Error
import AppError from '../../../shared/errors/AppError';

export default class RemoveMemberError extends AppError {
  super(message?, statusCode = 401) {
    this.message = message || [
      'An error occurred while removing a member, please try again later.',
    ];
    this.statusCode = statusCode;
  }
}
