// Repository
import ChannelRepository from '../../repositories/implementations/ChannelRepository';

// Use case
import IconUploadUseCase from './IconUploadUseCase';

// Controller
import IconController from './IconUploadController';

const iconUploadUseCase = new IconUploadUseCase(ChannelRepository);
const iconUploadController = new IconController(iconUploadUseCase);

export default iconUploadController;
