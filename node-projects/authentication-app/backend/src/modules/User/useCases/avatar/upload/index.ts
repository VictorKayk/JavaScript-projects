// Repository
import UserRepository from '../../../repositories/implementations/UserRepository';

// Use case
import AvatarUploadUseCase from './UploadUseCase';

// Controller
import AvatarController from './UploadController';

const avatarUploadUseCase = new AvatarUploadUseCase(UserRepository);
const avatarUploadController = new AvatarController(avatarUploadUseCase);

export default avatarUploadController;
