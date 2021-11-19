// Repository
import IChannelRepository from '../../repositories/IChannelRepository';

export default class Get10ChannelsUseCase {
  constructor(private ChannelRepository: IChannelRepository) {}

  async execute() {
    const channel = await this.ChannelRepository.get10Channels();
    return channel;
  }
}