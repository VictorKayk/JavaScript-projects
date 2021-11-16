// Repository
import UserRepository from '../../repositories/implementations/UserRepository';

// Use case
import RemoveAvatarUseCase from './RemoveAvatarUseCase';

// Controller
import RemoveAvatarController from './RemoveAvatarController';

const removeAvatarUseCase = new RemoveAvatarUseCase(UserRepository);
const removeAvatarController = new RemoveAvatarController(removeAvatarUseCase);

export default removeAvatarController;
