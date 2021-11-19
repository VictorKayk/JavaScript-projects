import ChannelRepository from "../../repositories/implementations/ChannelRepository";

// Use case
import Get10ChannelsUseCase from "./Get10ChannelsUseCase";

// Controller
import Get10ChannelsController from "./Get10ChannelsController";

const get10ChannelsUseCase = new Get10ChannelsUseCase(ChannelRepository);
const get10ChannelsController = new Get10ChannelsController(get10ChannelsUseCase);

export default get10ChannelsController;
