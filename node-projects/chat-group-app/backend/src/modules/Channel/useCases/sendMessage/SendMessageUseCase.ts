import { io } from '../../../../http';

// Repository
import IChannelRepository from '../../repositories/IChannelRepository';

// Validate
import validate from '../../validations/SendMessageValidate';

// Error
import SendMessageError from '../../errors/SendMessageError';

export default class SendMessageUseCase {
  constructor(private ChannelRepository: IChannelRepository) {}
  
  validate(message: string) {
    const valid = validate({ message });
    if (valid !== true) throw new SendMessageError(valid);
  }

  async execute(userID: number, channelID: number, message: string) {
    const adm = await this.ChannelRepository.isChannelAdmin(userID, channelID);

    if (!adm) {
      const member = await this.ChannelRepository.isChannelMember(userID, channelID);
      if (!member) throw new SendMessageError(['User must be a channel member to send a message in the channel.'], 403);
    }

    this.validate(message);

    const messageDb = await this.ChannelRepository.sendMessage(userID, channelID, message);
    io.emit('message', messageDb)
  }
}
