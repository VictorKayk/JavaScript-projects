import { Request, Response } from 'express';

// Use case
import RemoveAvatarUseCase from './RemoveAvatarUseCase';

// Error
import RemoveAvatarError from '../../errors/RemoveAvatarError';

export default class LoginUserController {
  constructor(private removeAvatarUseCase: RemoveAvatarUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.user;
    try {
      await this.removeAvatarUseCase.execute(Number(id));
      return res.status(200).json({ success: true });
    } catch (e) {
      throw new RemoveAvatarError([e.message], e.statusCode);
    }
  }
}
