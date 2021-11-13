import { resolve } from 'path';

// Repository
import IUserRepository from '../../repositories/IUserRepository';

// Utils
import deleteFile from '../../../../shared/utils/deleteFile';

export default class AvatarUploadUseCase {
  constructor(private UserRepository: IUserRepository) {}
  
  async execute(userId: string, avatar: string) {
    const user = await this.UserRepository.getUserById(userId);

    if (!user.avatar.endsWith('avatar_default.jpg')) {
      const path = resolve('./tmp', 'images', user.avatar);
      await deleteFile(path);
    }

    await this.UserRepository.updateAvatar(userId, avatar);
  }
}