import { resolve } from 'path';

// Repository
import IChannelRepository from '../../repositories/IChannelRepository';

// Validate
import validate from '../../validations/iconUploadUrlValidate';

// Interface
import IIconUpload from '../../interfaces/IIconUpload';

// Error
import IconUploadError from '../../errors/IconUploadError';

// Utils
import deleteFile from '../../../../shared/utils/deleteFile';

export default class IconUploadUseCase {
  constructor(private ChannelRepository: IChannelRepository) {}

  validate(url) {
    const valid = validate({ url });
    if (valid !== true) throw new IconUploadError(valid);
  }
  
  async execute(userID, { channelID, icon: { url }}: IIconUpload) {
    const admin = await this.ChannelRepository.IsChannelAdmin(userID, channelID);
    if (!admin) throw new IconUploadError(['User is not an admin.'], 403);

    this.validate(url);

    const icon = await this.ChannelRepository.getIconByChannelID(channelID);

    if (icon.name !== 'Channel icon') {
      const path = resolve('./tmp', 'uploads', 'icons', icon.name);
      await deleteFile(path);
    };

    await this.ChannelRepository.updateIcon({ channelID, icon:{ name: 'Channel icon', size: 0, url }});
  }
}
