// Error
import AppError from '../../../shared/errors/AppError';

export default class GithubLoginError extends AppError {
  super(message?, statusCode = 500) {
    this.message = message || [
      'An error occurred while the login with github, please try again later',
    ];
    this.statusCode = statusCode;
  }
}
