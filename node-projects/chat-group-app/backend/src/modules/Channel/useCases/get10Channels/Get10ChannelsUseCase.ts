// Repository
import IChannelRepository from '../../repositories/IChannelRepository';

export default class Get10ChannelsUseCase {
  constructor(private ChannelRepository: IChannelRepository) {}

  async execute() {
    const channels = await this.ChannelRepository.get10Channels();
    return channels;
  }
}