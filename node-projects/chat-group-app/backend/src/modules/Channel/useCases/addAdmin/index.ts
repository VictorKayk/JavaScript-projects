import ChannelRepository from "../../repositories/implementations/ChannelRepository";

// Use case
import AddAdminUseCase from "./AddAdminUseCase";

// Controller
import AddAdminController from "./AddAdminController";

const addAdminUseCase = new AddAdminUseCase(ChannelRepository);
const addAdminController = new AddAdminController(addAdminUseCase);

export default addAdminController;
