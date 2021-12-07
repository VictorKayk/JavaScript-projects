// Repository
import UserRepository from '../../repositories/implementations/UserRepository';

// Use case
import UpdateUserProfileUseCase from './UpdateProfileUseCase';

// Controller
import UpdateUserProfileController from './UpdateProfileController';

const updateUserProfileUseCase = new UpdateUserProfileUseCase(UserRepository);
const updateUserProfileController = new UpdateUserProfileController(updateUserProfileUseCase);

export default updateUserProfileController;
