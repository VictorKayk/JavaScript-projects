import { io } from '../../../../http';

// Repository
import IChannelRepository from '../../repositories/IChannelRepository';

// Error
import RemoveMemberError from '../../errors/RemoveMemberError';

export default class RemoveMemberUseCase {
  constructor(private ChannelRepository: IChannelRepository) {}

  async execute(userID: number, channelID: number, memberID: number) {
    const userAdm = await this.ChannelRepository.isChannelAdmin(userID, channelID);
    if (!userAdm) throw new RemoveMemberError(['You must be an admin to remove other members.'], 403);

    let member = await this.ChannelRepository.isChannelMember(memberID, channelID);
    if (!member) throw new RemoveMemberError(['The user must be a member to be removed of the channel.'], 400);

    member = await this.ChannelRepository.removeChannelMember(memberID, channelID);
    io.in(`channel-${channelID}`).emit('removing-member', member);
  }
}