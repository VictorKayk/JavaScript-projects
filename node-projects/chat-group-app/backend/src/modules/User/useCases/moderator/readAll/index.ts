// Repository
import UserRepository from '../../../repositories/implementations/UserRepository';

// Use case
import ReadAllUseCase from './ReadAllUseCase';

// Controller
import ReadAllController from './ReadAllController';

const readAllUseCase = new ReadAllUseCase(UserRepository);
const readAllController = new ReadAllController(readAllUseCase);

export default readAllController;
