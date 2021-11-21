import { io } from '../../../../http';

// Repository
import IChannelRepository from '../../repositories/IChannelRepository';

// Interfaces
import ICreateChannel from '../../interfaces/ICreateChannel'

// Validate
import validate from '../../validations/createChannelValidate';

// Error
import CreateChannelError from '../../errors/CreateChannelError';

export default class CreateChannelUseCase {
  constructor(private ChannelRepository: IChannelRepository) {}

  validate({ name, description }) {
    const valid = validate({ name, description });
    if (valid !== true) throw new CreateChannelError(valid);
  }

  async execute({ userID, name, description }: ICreateChannel) {
    this.validate({ name, description });
    const channel = await this.ChannelRepository.createChannel({ userID, name, description });

    await this.ChannelRepository.createChannelIcon({ channelID: channel.id, icon: {} });

    io.emit('create-channel', channel)
  }
}