import { resolve } from 'path';

// Repository
import IUserRepository from '../../repositories/IUserRepository';

// Interface
import IAvatarUpload from '../../interfaces/IAvatarUpload';

// Utils
import deleteFile from '../../../../shared/utils/deleteFile';

export default class AvatarUploadUseCase {
  constructor(private UserRepository: IUserRepository) {}
  
  async execute({ userId, avatar: { name, size, url }}: IAvatarUpload) {
    const avatar = await this.UserRepository.getAvatarByUserId(userId);

    if (avatar.name !== 'Profile picture') {
      const path = resolve('./tmp', 'uploads', avatar.name);
      await deleteFile(path);
    };

    await this.UserRepository.updateAvatar({ userId, avatar:{ name, size, url }});
  }
}
