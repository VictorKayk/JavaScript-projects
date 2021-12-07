import { Request, Response } from 'express';

// Use case
import RemoveUseCase from './RemoveUseCase';

// Error
import RemoveError from '../../../errors/RemoveAvatarError';

export default class LoginUserController {
  constructor(private removeUseCase: RemoveUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.user;
    try {
      await this.removeUseCase.execute(Number(id));
      return res.status(200).json({ success: true });
    } catch (e) {
      throw new RemoveError([e.message], e.statusCode);
    }
  }
}
