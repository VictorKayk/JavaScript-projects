import { io } from '../../../../http';

// Repository
import IChannelRepository from '../../repositories/IChannelRepository';

// Error
import RemoveAdminError from '../../errors/RemoveAdminError';

export default class RemoveAdminUseCase {
  constructor(private ChannelRepository: IChannelRepository) {}

  async execute(userID: number, channelID: number, adminID: number) {
    const userAdm = await this.ChannelRepository.isChannelAdmin(userID, channelID);
    if (!userAdm) throw new RemoveAdminError(['You must be an admin to remove other Admins.'], 403);

    const admin = await this.ChannelRepository.isChannelAdmin(adminID, channelID);
    if (!admin) throw new RemoveAdminError(['The user must be a admin to be dismiss as admin.'], 400);

    const groupOwner = await this.ChannelRepository.isChannelCreator(adminID, channelID);
    if (groupOwner) throw new RemoveAdminError(['Isn\'t possible to dismiss the channel creator as admin.'], 400);

    await this.ChannelRepository.removeChannelAdmin(adminID, channelID);

    const member = await this.ChannelRepository.addChannelMember(adminID, channelID);
    io.emit('removing-adm', member);
  }
}