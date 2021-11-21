import { io } from '../../../../http';

// Repository
import IChannelRepository from '../../repositories/IChannelRepository';

export default class GetChannelUseCase {
  constructor(private ChannelRepository: IChannelRepository) {}

  async execute(userID: number, channelID: number) {
    const adm = await this.ChannelRepository.isChannelAdmin(userID, channelID);

    if (!adm) {
      const member = await this.ChannelRepository.isChannelMember(userID, channelID);
      if (!member) {
        const newMember = await this.ChannelRepository.addChannelMember(userID, channelID);
        io.emit('new-member', newMember);
      }
    }

    const channel = await this.ChannelRepository.getChannel(channelID);
    return channel;
  }
}