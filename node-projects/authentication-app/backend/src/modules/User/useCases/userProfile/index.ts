// Repository
import UserRepository from '../../repositories/implementations/UserRepository';

// Use case
import UserProfileUseCase from './UserProfileUseCase';

// Controller
import UserProfileController from './UserProfileController';

const userProfileUseCase = new UserProfileUseCase(UserRepository);
const userProfileController = new UserProfileController(userProfileUseCase);

export default userProfileController;
