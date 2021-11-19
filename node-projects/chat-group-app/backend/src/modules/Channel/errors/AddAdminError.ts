// Error
import AppError from '../../../shared/errors/AppError';

export default class AddAdminError extends AppError {
  super(message?, statusCode = 401) {
    this.message = message || [
      'An error occurred while adding an admin, please try again later.',
    ];
    this.statusCode = statusCode;
  }
}
