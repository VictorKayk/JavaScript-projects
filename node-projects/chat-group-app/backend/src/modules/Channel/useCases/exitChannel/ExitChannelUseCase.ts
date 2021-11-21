import { io } from '../../../../http';

// Repository
import IChannelRepository from '../../repositories/IChannelRepository';

// Error
import ExitChannelError from '../../errors/ExitChannelError';

export default class ExitChannelUseCase {
  constructor(private ChannelRepository: IChannelRepository) {}
  
  async execute(userID: number, channelID: number) {
    const adm = await this.ChannelRepository.isChannelAdmin(userID, channelID);

    if (!adm) {
      const member = await this.ChannelRepository.isChannelMember(userID, channelID);
      if (!member) throw new ExitChannelError(['User must be a channel member to exit of the channel.'], 403);
      await this.ChannelRepository.removeChannelMember(userID, channelID);
      io.emit('member-exiting', member);
    } else {
      await this.ChannelRepository.removeChannelAdmin(userID, channelID);
      io.emit('adm-exiting', adm);
    }
  }
}
