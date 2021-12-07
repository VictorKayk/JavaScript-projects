// Repository
import IUserRepository from '../../repositories/IUserRepository';

export default class GetAllUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute() {
    const users = await this.userRepository.getAll();
    return users;
  }
}
