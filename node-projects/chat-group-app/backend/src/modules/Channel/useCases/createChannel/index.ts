import ChannelRepository from "../../repositories/implementations/ChannelRepository";

// Use case
import CreateChannelUseCase from "./CreateChannelUseCase";

// Controller
import CreateChannelController from "./CreateChannelController";

const createChannelUseCase = new CreateChannelUseCase(ChannelRepository);
const createChannelController = new CreateChannelController(createChannelUseCase);

export default createChannelController;
