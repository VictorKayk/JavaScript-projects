import { resolve } from 'path';

// Repository
import IUserRepository from '../../repositories/IUserRepository';

// Utils
import deleteFile from '../../../../shared/utils/deleteFile';

export default class RemoveAvatarUseCase {
  constructor(private UserRepository: IUserRepository) {}
  
  async execute(userID: string) {
    const avatar = await this.UserRepository.getAvatarByuserID(userID);

    if (avatar.name !== 'Profile picture') {
      const path = resolve('./tmp', 'uploads', avatar.name);
      await deleteFile(path);
    };

    await this.UserRepository.removeAvatar(userID);
  }
}