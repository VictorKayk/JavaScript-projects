// Repository
import ChannelRepository from '../../repositories/implementations/ChannelRepository';

// Use case
import RemoveIconUseCase from './SendMessageUseCase';

// Controller
import IconController from './SendMessageController';

const removeIconUseCase = new RemoveIconUseCase(ChannelRepository);
const removeIconController = new IconController(removeIconUseCase);

export default removeIconController;
