// Error
import AppError from '../../../shared/errors/AppError';

export default class AvatarUploadError extends AppError {
  super(message?, statusCode = 401) {
    this.message = message || [
      'An error occurred while the avatar upload, please try again later.',
    ];
    this.statusCode = statusCode;
  }
}
