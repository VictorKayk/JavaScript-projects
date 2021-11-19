import ChannelRepository from "../../repositories/implementations/ChannelRepository";

// Use case
import RemoveAdminUseCase from "./RemoveAdminUseCase";

// Controller
import RemoveAdminController from "./RemoveAdminController";

const removeAdminUseCase = new RemoveAdminUseCase(ChannelRepository);
const removeAdminController = new RemoveAdminController(removeAdminUseCase);

export default removeAdminController;
