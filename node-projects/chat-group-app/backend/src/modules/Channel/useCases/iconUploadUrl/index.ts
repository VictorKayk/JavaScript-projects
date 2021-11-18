// Repository
import ChannelRepository from '../../repositories/implementations/ChannelRepository';

// Use case
import IconUploadUrlUseCase from './IconUploadUrlUseCase';

// Controller
import IconController from './IconUploadUrlController';

const iconUploadUrlUseCase = new IconUploadUrlUseCase(ChannelRepository);
const iconUploadUrlController = new IconController(iconUploadUrlUseCase);

export default iconUploadUrlController;
