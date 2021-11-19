import ChannelRepository from "../../repositories/implementations/ChannelRepository";

// Use case
import DeleteChannelUseCase from "./DeleteChannelUseCase";

// Controller
import DeleteChannelController from "./DeleteChannelController";

const deleteChannelUseCase = new DeleteChannelUseCase(ChannelRepository);
const deleteChannelController = new DeleteChannelController(deleteChannelUseCase);

export default deleteChannelController;
