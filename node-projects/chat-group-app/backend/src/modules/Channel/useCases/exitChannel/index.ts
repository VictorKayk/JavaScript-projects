// Repository
import ChannelRepository from '../../repositories/implementations/ChannelRepository';

// Use case
import ExitChannelUseCase from './ExitChannelUseCase';

// Controller
import IconController from './ExitChannelController';

const exitChannelUseCase = new ExitChannelUseCase(ChannelRepository);
const exitChannelController = new IconController(exitChannelUseCase);

export default exitChannelController;
