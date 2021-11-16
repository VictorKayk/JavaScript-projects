// Repository
import UserRepository from '../../repositories/implementations/UserRepository';

// Use case
import AvatarUploadUrlUseCase from './AvatarUploadUrlUseCase';

// Controller
import AvatarUrlController from './AvatarUploadUrlController';

const avatarUploadUrlUseCase = new AvatarUploadUrlUseCase(UserRepository);
const avatarUploadUrlController = new AvatarUrlController(avatarUploadUrlUseCase);

export default avatarUploadUrlController;
