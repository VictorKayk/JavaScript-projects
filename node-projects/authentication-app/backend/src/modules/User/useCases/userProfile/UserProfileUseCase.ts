// Repository
import IUserRepository from '../../repositories/IUserRepository';

export default class UserInfosUseCase {
  constructor(private UserRepository: IUserRepository) {}

  async execute(userID: number) {
    const user = await this.UserRepository.userProfile(userID);
    return user;
  }
}
