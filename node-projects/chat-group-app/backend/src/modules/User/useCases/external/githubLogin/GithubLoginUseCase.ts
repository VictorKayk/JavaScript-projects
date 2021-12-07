import { sign } from 'jsonwebtoken';

// Repository
import IUserRepository from '../../../repositories/IUserRepository';

// Interface
import IGithubLogin from '../../../interfaces/IGithubLogin';

export default class GithubLoginUseCase {
  constructor(private UserRepository: IUserRepository) {}

  getToken(userID) {
    const token = sign({
      sub: `${userID}`,
    }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  }

  async execute({
    id, name, email, bio, avatar_url,
  }: IGithubLogin) {
    let userID;

    const githubIdExists = await this.UserRepository.githubIdExists(id);
    if (githubIdExists) {
      userID = await this.UserRepository.getUserByGithubId(id);
    } else {
      userID = await this.UserRepository.register({
        githubId: id,
        name,
        email,
        bio,
      });

      await this.UserRepository.createAvatar(userID, { avatar: { url: avatar_url } });
    }

    const token = this.getToken(userID);
    return token;
  }
}
