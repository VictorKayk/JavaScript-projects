import { resolve } from 'path';

// Repository
import IUserRepository from '../../repositories/IUserRepository';

// Validate
import validate from '../../validations/avatarUploadUrlValidate';

// Error
import AvatarUploadError from '../../errors/AvatarUploadError';

// Utils
import deleteFile from '../../../../shared/utils/deleteFile';

export default class AvatarUploadUrlUseCase {
  constructor(private UserRepository: IUserRepository) {}
  
  validate(avatar) {
    const valid = validate({ avatar });
    if (valid !== true) throw new AvatarUploadError(valid);
  }

  async execute(userID: number, avatarUrl: string) {
    this.validate(avatarUrl);

    const avatar = await this.UserRepository.getAvatarByUserID(userID);

    if (avatar.name !== 'Profile picture') {
      const path = resolve('./tmp', 'uploads', avatar.name);
      await deleteFile(path);
    };

    await this.UserRepository.updateAvatar(userID, { avatar: { name: 'Profile picture', url: avatarUrl, size: 0 }});
  }
}