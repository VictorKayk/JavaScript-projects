// Repository
import IUserRepository from '../../../repositories/IUserRepository';

// Validate
import validate from '../../../validations/moderator';

// Error
import ModeratorError from '../../../errors/ModeratorError';

export default class AddUseCase {
  constructor(private userRepository: IUserRepository) {}

  validate(userID: number) {
    const valid = validate({ userID });
    if (valid !== true) throw new ModeratorError(valid, 400);
  }

  async execute(userID: number) {
    this.validate(userID);

    const userExists = await this.userRepository.userExists(userID);
    if (!userExists) throw new ModeratorError(['User does not exits.']);

    const user = await this.userRepository.getUserById(userID);
    if (user.role === 'moderator') throw new ModeratorError(['User is already a moderator.']);
    else if (user.role === 'admin') throw new ModeratorError(['User is an admin.']);

    await this.userRepository.addModerator(userID);
  }
}
