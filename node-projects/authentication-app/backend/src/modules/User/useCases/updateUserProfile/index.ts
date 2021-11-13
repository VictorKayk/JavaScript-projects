// Repository
import UserRepository from '../../repositories/implementations/UserRepository';

// Use case
import UpdateUserProfileUseCase from './UpdateUserProfileUseCase';

// Controller
import UpdateUserProfileController from './UpdateUserProfileController';

const updateUserProfileUseCase = new UpdateUserProfileUseCase(UserRepository);
const updateUserProfileController = new UpdateUserProfileController(updateUserProfileUseCase);

export default updateUserProfileController;
