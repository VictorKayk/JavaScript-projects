import { Request, Response } from 'express';

// Interface
import ILogin from '../../interfaces/ILogin';

// Use case
import LoginUserUseCase from './LoginUserUseCase';

// Error
import LoginError from '../../../../errors/userErrors/LoginError';

export default class LoginUserController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { email, password }: ILogin = req.body;

    try {
      const token = await this.loginUserUseCase.execute({ email, password });
      return res.status(201).json({ success: true, token });
    } catch (e) {
      throw new LoginError([e.message], e.statusCode);
    }
  }
}
