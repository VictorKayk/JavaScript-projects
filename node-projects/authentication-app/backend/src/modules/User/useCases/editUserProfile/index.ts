// Repository
import UserRepository from '../../repositories/implementations/UserRepository';

// Use case
import EditUserProfileUseCase from './EditUserProfileUseCase';

// Controller
import EditUserProfileController from './EditUserProfileController';

const editUserProfileUseCase = new EditUserProfileUseCase(UserRepository);
const editUserProfileController = new EditUserProfileController(editUserProfileUseCase);

export default editUserProfileController;
