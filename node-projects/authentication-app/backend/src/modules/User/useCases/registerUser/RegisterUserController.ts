import { Request, Response } from 'express';

// Interface
import IRegister from '../../interfaces/IRegister';

// Use case
import RegisterUserUseCase from './RegisterUserUseCase';

// Error
import RegisterError from '../../../../errors/userErrors/RegisterError';

export default class RegisterUserController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { name, email, password, avatar, bio, phone }: IRegister = req.body;

    const errors: string[] = [];

    if (!name || typeof name !== 'string') errors.push('Name is invalid.');
    if (!email || typeof email !== 'string') errors.push('Email is invalid.');
    if (!password || typeof password !== 'string')
      errors.push('Password is invalid.');
    if (avatar && typeof password !== 'string')
      errors.push('Avatar is invalid.');
    if (bio && typeof password !== 'string') errors.push('Bio is invalid.');
    if (phone && typeof password !== 'string') errors.push('Phone is invalid.');

    if (errors.length > 0) throw new RegisterError(errors);

    try {
      await this.registerUserUseCase.execute({
        name,
        email,
        password,
        avatar,
        bio,
        phone,
      });
      return res.status(201).json({ success: true });
    } catch (e) {
      throw new RegisterError();
    }
  }
}
