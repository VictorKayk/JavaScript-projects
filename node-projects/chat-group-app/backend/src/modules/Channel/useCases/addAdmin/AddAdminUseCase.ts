import { io } from '../../../../http';

// Repository
import IChannelRepository from '../../repositories/IChannelRepository';

// Error
import AddAdminError from '../../errors/AddAdminError';

export default class AddAdminUseCase {
  constructor(private ChannelRepository: IChannelRepository) {}

  async execute(userID: number, channelID: number, memberID: number) {
    const userAdm = await this.ChannelRepository.isChannelAdmin(userID, channelID);
    if (!userAdm) throw new AddAdminError(['You must be an admin to adding another admin.'], 403);

    const memberAdm = await this.ChannelRepository.isChannelAdmin(memberID, channelID);
    if (memberAdm) throw new AddAdminError(['The user is already an channel admin.'], 400);

    const member = await this.ChannelRepository.isChannelMember(memberID, channelID);
    if (!member) throw new AddAdminError(['The user must be a member to be became admin of the channel.'], 400);

    await this.ChannelRepository.removeChannelMember(memberID, channelID);

    const adm = await this.ChannelRepository.addChannelAdmin(memberID, channelID);
    io.in(`channel-${channelID}`).emit('new-adm', adm);
  }
}