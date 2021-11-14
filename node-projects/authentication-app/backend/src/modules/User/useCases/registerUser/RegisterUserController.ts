import { Request, Response } from 'express';

// Interface
import IRegister from '../../interfaces/IRegister';

// Use case
import RegisterUserUseCase from './RegisterUserUseCase';

// Error
import RegisterError from '../../errors/RegisterError';

export default class RegisterUserController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { name, email, password, bio, phone }: IRegister = req.body;
    try {
      const token = await this.registerUserUseCase.execute({
        name,
        email,
        password,
        bio,
        phone,
      });
      return res.status(201).json({ success: true, token });
    } catch (e) {
      throw new RegisterError([e.message], e.statusCode);
    }
  }
}
