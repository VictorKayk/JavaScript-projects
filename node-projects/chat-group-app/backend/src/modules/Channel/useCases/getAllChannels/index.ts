import ChannelRepository from "../../repositories/implementations/ChannelRepository";

// Use case
import GetAllChannelsUseCase from "./GetAllChannelsUseCase";

// Controller
import GetAllChannelsController from "./GetAllChannelsController";

const getAllChannelsUseCase = new GetAllChannelsUseCase(ChannelRepository);
const getAllChannelsController = new GetAllChannelsController(getAllChannelsUseCase);

export default getAllChannelsController;
