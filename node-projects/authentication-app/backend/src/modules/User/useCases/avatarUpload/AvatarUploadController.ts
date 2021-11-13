import { Request, Response } from 'express';

// Use case
import AvatarUseCase from './AvatarUploadUseCase';

// Error
import AvatarUploadError from '../../errors/AvatarUploadError';

export default class AvatarController {
  constructor(private avatarUseCase: AvatarUseCase) {}

  async handle(req: Request, res: Response) {
    const { userId } = req.user;
    const { filename } = req.file;
    try {
      await this.avatarUseCase.execute(userId, filename);
      return res.status(200).json({ success: true });
    } catch (e) {
      throw new AvatarUploadError([e.message], e.statusCode);
    }
  }
}
