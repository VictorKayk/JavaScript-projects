// Repository
import UserRepository from '../../../repositories/implementations/UserRepository';

// Use case
import LoginUserUseCase from './LoginUseCase';

// Controller
import LoginUserController from './LoginController';

const loginUserUseCase = new LoginUserUseCase(UserRepository);
const loginUserController = new LoginUserController(loginUserUseCase);

export default loginUserController;
