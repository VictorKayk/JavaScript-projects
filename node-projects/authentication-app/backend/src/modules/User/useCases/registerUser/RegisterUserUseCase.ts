// Repository
import IUserRepository from '../../repositories/IUserRepository';

// Interfaces
import IRegister from '../../interfaces/IRegister';

export default class RegisterUserUseCase {
  constructor(private UserRepository: IUserRepository) {}

  async execute(user: IRegister) {
    await this.UserRepository.register(user);
  }
}
