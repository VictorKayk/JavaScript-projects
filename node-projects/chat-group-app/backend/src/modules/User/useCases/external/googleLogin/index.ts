// Repository
import UserRepository from '../../../repositories/implementations/UserRepository';

// Use case
import GoogleLoginUseCase from './GoogleLoginUseCase';

// Controller
import GoogleLoginController from './GoogleLoginController';

const googleLoginUseCase = new GoogleLoginUseCase(UserRepository);
const googleLoginController = new GoogleLoginController(googleLoginUseCase);

export default googleLoginController;
