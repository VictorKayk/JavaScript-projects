import { Request, Response } from 'express';

// Use case
import UploadUrlUseCase from './UploadUrlUseCase';

// Error
import UploadError from '../../../errors/AvatarUploadError';

export default class UrlController {
  constructor(private uploadUrlUseCase: UploadUrlUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.user;
    const { url } = req.body;
    try {
      await this.uploadUrlUseCase.execute(Number(id), url);
      return res.status(200).json({ success: true });
    } catch (e) {
      throw new UploadError([e.message], e.statusCode);
    }
  }
}
