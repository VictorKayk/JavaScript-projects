// Repository
import IUserRepository from '../../../repositories/IUserRepository';

export default class ReadAllUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute() {
    const admins = await this.userRepository.readAllAdmins();
    return admins;
  }
}
