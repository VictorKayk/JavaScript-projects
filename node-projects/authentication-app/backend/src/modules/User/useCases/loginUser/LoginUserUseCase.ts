import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

// Repository
import IUserRepository from '../../repositories/IUserRepository';

// Validate
import validate from '../../validations/loginUserValidate';

// Error
import LoginError from '../../errors/LoginError';

// Interface
interface IRequest {
  email: string;
  password: string;
}

export default class LoginUserUseCase {
  constructor(private UserRepository: IUserRepository) {}

  validate({ email, password }: IRequest) {
    const valid = validate({ email, password });
    if (valid !== true) throw new LoginError(valid);
  }

  async emailExists(email: string) {
    const emailExists = await this.UserRepository.emailExists(email);
    if (!emailExists) throw new LoginError('Email or password incorrect.');
  }

  comparePassword(password, hashPassword) {
    const comparePassword = compareSync(password, hashPassword);
    if (!comparePassword) throw new LoginError('Email or password incorrect.');
  }

  async execute({ email, password }: IRequest) {
    this.validate({ email, password });

    await this.emailExists(email);

    const user = await this.UserRepository.getUserByEmail(email);
    this.comparePassword(password, user.password);

    const token = sign({}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
      subject: `${user.id}`,
    });

    return token;
  }
}
