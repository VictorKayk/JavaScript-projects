// Repository
import IChannelRepository from '../../repositories/IChannelRepository';

export default class GetAllChannelsUseCase {
  constructor(private ChannelRepository: IChannelRepository) {}

  async execute() {
    const channels = await this.ChannelRepository.getAllChannels();
    return channels;
  }
}