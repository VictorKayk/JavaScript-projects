// Repository
import UserRepository from '../../repositories/implementations/UserRepository';

// Use case
import LoginUserUseCase from './LoginUserUseCase';

// Controller
import LoginUserController from './LoginUserController';

const loginUserUseCase = new LoginUserUseCase(UserRepository);
const loginUserController = new LoginUserController(loginUserUseCase);

export default loginUserController;
