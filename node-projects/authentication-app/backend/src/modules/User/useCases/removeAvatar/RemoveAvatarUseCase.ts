// Repository
import IUserRepository from '../../repositories/IUserRepository';

export default class RemoveAvatarUseCase {
  constructor(private UserRepository: IUserRepository) {}
  
  async execute(userId: string) {
    await this.UserRepository.removeAvatar(userId);
  }
}