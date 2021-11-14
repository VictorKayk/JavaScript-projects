// Repository
import IUserRepository from '../../repositories/IUserRepository';

// Validate
import validate from '../../validations/userAvatarValidate';

// Error
import AvatarUploadError from '../../errors/AvatarUploadError';

export default class AvatarUploadUrlUseCase {
  constructor(private UserRepository: IUserRepository) {}
  
  validate(avatar) {
    const valid = validate({ avatar });
    if (valid !== true) throw new AvatarUploadError(valid);
  }

  async execute(userId: string, avatarUrl: string) {
    this.validate(avatarUrl);

    await this.UserRepository.updateAvatar({ userId, avatar: { url: avatarUrl }});
  }
}