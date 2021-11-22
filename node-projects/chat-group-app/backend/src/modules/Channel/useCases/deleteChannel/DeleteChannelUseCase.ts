import { io } from '../../../../http';

// Repository
import IChannelRepository from '../../repositories/IChannelRepository';

// Error
import DeleteChannelError from '../../errors/DeleteChannelError';

export default class DeleteChannelUseCase {
  constructor(private ChannelRepository: IChannelRepository) {}

  async execute(userID: number, channelID: number) {
    const creator = await this.ChannelRepository.isChannelCreator(userID, channelID);
    if (!creator) throw new DeleteChannelError(['User must be the channel creator to delete the channel.'], 403);

    const channel = await this.ChannelRepository.deleteChannel(channelID);
    io.in(`channel-${channelID}`).emit('deleting-channel', channel);
  }
}