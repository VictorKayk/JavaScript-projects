// Repository
import IChannelRepository from '../../repositories/IChannelRepository';

export default class GetChannelUseCase {
  constructor(private ChannelRepository: IChannelRepository) {}

  async execute(userID: number, channelID: number) {
    const adm = await this.ChannelRepository.isChannelAdmin(userID, channelID);

    if (!adm) {
      const member = await this.ChannelRepository.isChannelMember(userID, channelID);
      if (!member) await this.ChannelRepository.addChannelMember(userID, channelID);
    }

    const channel = await this.ChannelRepository.getChannel(channelID);
    return channel;
  }
}