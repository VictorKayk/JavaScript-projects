import { resolve } from 'path';

// Repository
import IUserRepository from '../../repositories/IUserRepository';

// Utils
import deleteFile from '../../../../shared/utils/deleteFile';

export default class RemoveAvatarUseCase {
  constructor(private UserRepository: IUserRepository) {}
  
  async execute(userId: string) {
    const avatar = await this.UserRepository.getAvatarByUserId(userId);

    if (avatar.name !== 'Profile picture') {
      const path = resolve('./tmp', 'uploads', avatar.name);
      await deleteFile(path);
    };

    await this.UserRepository.removeAvatar(userId);
  }
}