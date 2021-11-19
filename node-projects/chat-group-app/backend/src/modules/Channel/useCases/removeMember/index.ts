import ChannelRepository from "../../repositories/implementations/ChannelRepository";

// Use case
import RemoveMemberUseCase from "./RemoveMemberUseCase";

// Controller
import RemoveMemberController from "./RemoveMemberController";

const removeMemberUseCase = new RemoveMemberUseCase(ChannelRepository);
const removeMemberController = new RemoveMemberController(removeMemberUseCase);

export default removeMemberController;
