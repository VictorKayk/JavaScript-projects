// Repository
import UserRepository from '../../repositories/implementations/UserRepository';

// Use case
import RegisterUserUseCase from './RegisterUserUseCase';

// Controller
import RegisterUserController from './RegisterUserController';

const registerUserCase = new RegisterUserUseCase(UserRepository);
const registerUserController = new RegisterUserController(registerUserCase);

export default registerUserController;
