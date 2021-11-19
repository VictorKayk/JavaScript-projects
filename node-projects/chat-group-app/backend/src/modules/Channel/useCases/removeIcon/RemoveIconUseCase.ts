import { resolve } from 'path';

// Repository
import IChannelRepository from '../../repositories/IChannelRepository';

// Validate
import validate from '../../validations/iconUploadUrlValidate';

// Interface
import IIconUpload from '../../interfaces/IIconUpload';

// Error
import RemoveIconError from '../../errors/RemoveIconError';

// Utils
import deleteFile from '../../../../shared/utils/deleteFile';

export default class IconUploadUseCase {
  constructor(private ChannelRepository: IChannelRepository) {}
  
  async execute(userID, { channelID }: IIconUpload) {
    const admin = await this.ChannelRepository.isChannelAdmin(userID, channelID);
    if (!admin) throw new RemoveIconError(['User is not an admin.'], 403);

    const icon = await this.ChannelRepository.getIconByChannelID(channelID);

    if (icon.name !== 'Channel icon') {
      const path = resolve('./tmp', 'uploads', 'icons', icon.name);
      await deleteFile(path);
    };

    await this.ChannelRepository.removeIcon(channelID);
  }
}
