import { Request, Response } from 'express';

// Use case
import AvatarUrlUseCase from './AvatarUploadUrlUseCase';

// Error
import AvatarUploadError from '../../errors/AvatarUploadError';

export default class AvatarUrlController {
  constructor(private avatarUrlUseCase: AvatarUrlUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.user;
    const { url } = req.body;
    try {
      await this.avatarUrlUseCase.execute(Number(id), url);
      return res.status(200).json({ success: true });
    } catch (e) {
      throw new AvatarUploadError([e.message], e.statusCode);
    }
  }
}
