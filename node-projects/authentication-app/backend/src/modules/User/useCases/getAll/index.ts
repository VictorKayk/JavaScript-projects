// Repository
import UserRepository from '../../repositories/implementations/UserRepository';

// Use case
import GetAllUseCase from './GetAllUseCase';

// Controller
import GetAllController from './GetAllController';

const getAllUseCase = new GetAllUseCase(UserRepository);
const getAllController = new GetAllController(getAllUseCase);

export default getAllController;
