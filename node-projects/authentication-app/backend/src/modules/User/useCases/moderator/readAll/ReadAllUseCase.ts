// Repository
import IUserRepository from '../../../repositories/IUserRepository';

export default class ReadAllUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute() {
    const moderators = await this.userRepository.readAllModerators();
    return moderators;
  }
}
