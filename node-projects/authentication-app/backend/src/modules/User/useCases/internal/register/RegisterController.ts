import { Request, Response } from 'express';

// Interface
import IRegister from '../../../interfaces/IRegister';

// Use case
import RegisterUseCase from './RegisterUseCase';

// Error
import RegisterError from '../../../errors/RegisterError';

export default class RegisterController {
  constructor(private registerUseCase: RegisterUseCase) {}

  async handle(req: Request, res: Response) {
    const {
      name, email, password, bio, phone,
    }: IRegister = req.body;
    try {
      const token = await this.registerUseCase.execute({
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
