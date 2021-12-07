import { Request, Response } from 'express';

// Interface
import ILogin from '../../../interfaces/ILogin';

// Use case
import LoginUseCase from './LoginUseCase';

// Error
import LoginError from '../../../errors/LoginError';

export default class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  async handle(req: Request, res: Response) {
    const { email, password }: ILogin = req.body;

    try {
      const token = await this.loginUseCase.execute({ email, password });
      return res.status(200).json({ success: true, token });
    } catch (e) {
      throw new LoginError([e.message], e.statusCode);
    }
  }
}
