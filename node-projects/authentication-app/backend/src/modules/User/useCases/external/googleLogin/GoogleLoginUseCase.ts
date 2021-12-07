import { sign } from 'jsonwebtoken';

// Repository
import IUserRepository from '../../../repositories/IUserRepository';

// Interface
import IGoogleLogin from '../../../interfaces/IGoogleLogin';

export default class GoogleLoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  getToken(userID) {
    const token = sign({
      sub: `${userID}`,
    }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  }

  async execute({
    id, name, email, picture,
  }: IGoogleLogin) {
    let userID;
    const googleIdExists = await this.userRepository.googleIdExists(id);
    if (googleIdExists) {
      userID = await this.userRepository.getUserByGoogleId(id);
    } else {
      userID = await this.userRepository.register({
        googleId: id,
        name,
        email,
      });
      await this.userRepository.createAvatar(userID, { avatar: { url: picture } });
    }

    const token = this.getToken(userID);
    return token;
  }
}
