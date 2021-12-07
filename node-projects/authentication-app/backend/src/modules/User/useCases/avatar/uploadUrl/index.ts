// Repository
import UserRepository from '../../../repositories/implementations/UserRepository';

// Use case
import AvatarUploadUrlUseCase from './UploadUrlUseCase';

// Controller
import AvatarUrlController from './UploadUrlController';

const avatarUploadUrlUseCase = new AvatarUploadUrlUseCase(UserRepository);
const avatarUploadUrlController = new AvatarUrlController(avatarUploadUrlUseCase);

export default avatarUploadUrlController;
