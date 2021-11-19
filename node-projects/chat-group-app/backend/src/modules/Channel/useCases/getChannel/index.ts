import ChannelRepository from "../../repositories/implementations/ChannelRepository";

// Use case
import GetChannelUseCase from "./GetChannelUseCase";

// Controller
import GetChannelController from "./GetChannelController";

const getChannelUseCase = new GetChannelUseCase(ChannelRepository);
const getChannelController = new GetChannelController(getChannelUseCase);

export default getChannelController;
