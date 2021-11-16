import { genSaltSync, hashSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

// Repository
import IUserRepository from '../../repositories/IUserRepository';

// Interfaces
import IRegister from '../../interfaces/IRegister';

// Validate
import validate from '../../validations/registerUserValidate';

// Errors
import RegisterError from '../../errors/RegisterError';

export default class RegisterUserUseCase {
  constructor(private UserRepository: IUserRepository) {}

  validate({ name, email, password, bio, phone }: IRegister) {
    const valid = validate({ name, email, password, bio, phone });
    if (valid !== true) throw new RegisterError(valid);
  }

  async valuesUniques(email: string, phone: string) {
    const errors = [];

    // Email already exists
    if (email) {
      const emailExists = await this.UserRepository.emailExists(email);
      if (emailExists)
        errors.push(
          'Email already exists, please login or use another email to register.',
        );
    }

    // Phone already exists
    if (phone) {
      const phoneExists = await this.UserRepository.phoneExists(phone);
      if (phoneExists)
        errors.push(
          'Phone already exists, please login or use another phone to register.',
        );
    }
    if (errors.length > 0) throw new RegisterError(errors);
  }

  hashPassword(password) {
    const salt = genSaltSync();
    const hashPassword = hashSync(password, salt);
    return hashPassword;
  }

  getToken(userID) {
    const token = sign({}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
      subject: `${userID}`,
    });
   return token;
  }

  async execute({ name, email, password, bio, phone }: IRegister) {
    this.validate({ name, email, password, bio, phone });

    await this.valuesUniques(email, phone);

    const hashPassword = this.hashPassword(password);

    const userID = await this.UserRepository.register({
      name,
      email,
      password: hashPassword,
      bio,
      phone,
    });

    await this.UserRepository.createAvatar({ userID, avatar: {} });

    const token = this.getToken(userID);
    return token;
  }
}
