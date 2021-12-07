// Repository
import UserRepository from '../../../repositories/implementations/UserRepository';

// Use case
import RegisterUserUseCase from './RegisterUseCase';

// Controller
import RegisterUserController from './RegisterController';

const registerUserCase = new RegisterUserUseCase(UserRepository);
const registerUserController = new RegisterUserController(registerUserCase);

export default registerUserController;
