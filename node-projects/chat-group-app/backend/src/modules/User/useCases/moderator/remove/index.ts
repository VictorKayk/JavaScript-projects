// Repository
import UserRepository from '../../../repositories/implementations/UserRepository';

// Use case
import RemoveUseCase from './RemoveUseCase';

// Controller
import RemoveController from './RemoveController';

const removeUseCase = new RemoveUseCase(UserRepository);
const removeController = new RemoveController(removeUseCase);

export default removeController;
