import { resolve } from 'path';

// Repository
import IUserRepository from '../../repositories/IUserRepository';

// Interface
import IAvatarUpload from '../../interfaces/IAvatarUpload';

// Utils
import deleteFile from '../../../../shared/utils/deleteFile';

export default class AvatarUploadUseCase {
  constructor(private UserRepository: IUserRepository) {}
  
  async execute({ userID, avatar: { name, size, url }}: IAvatarUpload) {
    const avatar = await this.UserRepository.getAvatarByuserID(userID);

    if (avatar.name !== 'Profile picture') {
      const path = resolve('./tmp', 'uploads', avatar.name);
      await deleteFile(path);
    };

    await this.UserRepository.updateAvatar({ userID, avatar:{ name, size, url }});
  }
}
