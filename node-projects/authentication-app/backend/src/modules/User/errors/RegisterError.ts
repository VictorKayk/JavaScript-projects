// Error
import AppError from '../../../shared/errors/AppError';

export default class RegisterError extends AppError {
  super(message?, statusCode = 500) {
    this.message = message || [
      'An error occurred while the register, please try again later',
    ];
    this.statusCode = statusCode;
  }
}
