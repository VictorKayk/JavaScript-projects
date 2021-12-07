// Repository
import UserRepository from '../../repositories/implementations/UserRepository';

// Use case
import UserProfileUseCase from './GetProfileUseCase';

// Controller
import UserProfileController from './GetProfileController';

const userProfileUseCase = new UserProfileUseCase(UserRepository);
const userProfileController = new UserProfileController(userProfileUseCase);

export default userProfileController;
