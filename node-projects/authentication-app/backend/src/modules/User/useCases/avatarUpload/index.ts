// Repository
import UserRepository from '../../repositories/implementations/UserRepository';

// Use case
import AvatarUploadUseCase from './AvatarUploadUseCase';

// Controller
import AvatarController from './AvatarUploadController';

const avatarUploadUseCase = new AvatarUploadUseCase(UserRepository);
const avatarUploadController = new AvatarController(avatarUploadUseCase);

export default avatarUploadController;
