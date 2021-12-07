import { resolve } from 'path';

// Repository
import IUserRepository from '../../../repositories/IUserRepository';

// Utils
import deleteFile from '../../../../../shared/utils/deleteFile';

export default class RemoveUseCase {
  constructor(private UserRepository: IUserRepository) {}

  async execute(userID: number) {
    const avatar = await this.UserRepository.getAvatarByUserID(userID);

    if (avatar.name !== 'Profile picture') {
      const path = resolve('./tmp', 'uploads', avatar.name);
      await deleteFile(path);
    }

    await this.UserRepository.removeAvatar(userID);
  }
}
