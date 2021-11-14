import { resolve } from 'path';

// Repository
import IUserRepository from '../../repositories/IUserRepository';

// Utils
import deleteFile from '../../../../shared/utils/deleteFile';

// Interface
import IAvatarUpload from '../../interfaces/IAvatarUpload';

export default class AvatarUploadUseCase {
  constructor(private UserRepository: IUserRepository) {}
  
  async execute({ userId, avatar: { name, size, url }}: IAvatarUpload) {
    const user = await this.UserRepository.getUserById(userId);

    if (!user.avatar.endsWith('avatar_default.jpg')) {
      const path = resolve('./tmp', 'uploads', user.avatar.name);
      await deleteFile(path);
    }

    await this.UserRepository.updateAvatar({ userId, avatar:{ name, size, url }});
  }
}

// Upload to amazon