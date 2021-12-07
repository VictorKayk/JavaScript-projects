// Repository
import UserRepository from '../../../repositories/implementations/UserRepository';

// Use case
import RemoveAvatarUseCase from './RemoveUseCase';

// Controller
import RemoveAvatarController from './RemoveController';

const removeAvatarUseCase = new RemoveAvatarUseCase(UserRepository);
const removeAvatarController = new RemoveAvatarController(removeAvatarUseCase);

export default removeAvatarController;
