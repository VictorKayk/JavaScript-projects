// Repository
import UserRepository from '../../../repositories/implementations/UserRepository';

// Use case
import AddUseCase from './AddUseCase';

// Controller
import AddController from './AddController';

const addUseCase = new AddUseCase(UserRepository);
const addController = new AddController(addUseCase);

export default addController;
