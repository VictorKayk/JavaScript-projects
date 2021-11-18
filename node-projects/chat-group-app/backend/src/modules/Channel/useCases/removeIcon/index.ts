// Repository
import ChannelRepository from '../../repositories/implementations/ChannelRepository';

// Use case
import RemoveIconUseCase from './RemoveIconUseCase';

// Controller
import IconController from './RemoveIconController';

const removeIconUseCase = new RemoveIconUseCase(ChannelRepository);
const removeIconController = new IconController(removeIconUseCase);

export default removeIconController;
