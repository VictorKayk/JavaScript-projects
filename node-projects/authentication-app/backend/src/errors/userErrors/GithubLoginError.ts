// Error
import AppError from '../AppError';

export default class GithubLoginError extends AppError {
  super(message?, statusCode = 500) {
    this.message = message || [
      'An error occurred during the login with github, please try again later',
    ];
    this.statusCode = statusCode;
  }
}
