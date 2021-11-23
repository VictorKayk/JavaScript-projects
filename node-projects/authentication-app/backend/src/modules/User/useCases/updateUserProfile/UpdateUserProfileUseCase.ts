import { genSaltSync, hashSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

// Repository
import IUserRepository from '../../repositories/IUserRepository';

// Interface
import IUpdateUserProfile from '../../interfaces/IUpdateUserProfile';

// Validate
import validate from '../../validations/updateUserValidate';

// Errors
import UpdateUserProfileError from '../../errors/UpdateUserProfileError';

export default class UpdateUserProfilesUseCase {
  constructor(private UserRepository: IUserRepository) {}

  validate({ name, email, password, bio, phone }: IUpdateUserProfile) {
    const valid = validate({ name, email, password, bio, phone });
    if (valid !== true) throw new UpdateUserProfileError(valid);
  }

  async valuesUniques(userID: number, { email, phone }) {
    const errors = [];

    // Email already exists
    if (email) {
      const emailUser = await this.UserRepository.getUserByEmail(email);
      if (emailUser && userID !== emailUser.id)
        errors.push(
          'Email already exists, please login or use another email to register.',
        );
    }

    // Phone already exists
    if (phone) {
      const phoneUser = await this.UserRepository.getUserByPhone(phone);
      if (phoneUser && userID !== phoneUser.id)
        errors.push(
          'Phone already exists, please login or use another phone to register.',
        );
    }
    if (errors.length > 0) throw new UpdateUserProfileError(errors);
  }

  hashPassword(password) {
    if (password) {
      const salt = genSaltSync();
      const hashPassword = hashSync(password, salt);
      return hashPassword;
    }
  }

  getToken(userID) {
    const token = sign({}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
      subject: `${userID}`,
    });
   return token;
  }

  async execute(id: number, { name, email, password, bio, phone }: IUpdateUserProfile) {
    this.validate({ name, email, password, bio, phone });

    await this.valuesUniques(id, { email, phone });

    const hashPassword = this.hashPassword(password);

    const userID = await this.UserRepository.updateUserProfile(id, {
      name,
      email,
      password: hashPassword,
      bio,
      phone,
    });
  
    const token = this.getToken(userID);
    return token;
  }
}
