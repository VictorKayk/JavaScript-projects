// Repository
import IUserRepository from '../../repositories/IUserRepository';

export default class UserInfosUseCase {
  constructor(private UserRepository: IUserRepository) {}

  async execute(userId: string) {
    const user = await this.UserRepository.userProfile(userId);
    return user;
  }
}
