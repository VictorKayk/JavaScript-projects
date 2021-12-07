import { Request, Response } from 'express';

// Use case
import UploadUseCase from './UploadUseCase';

// Error
import AvatarUploadError from '../../../errors/AvatarUploadError';

export default class AvatarController {
  constructor(private uploadUseCase: UploadUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.user;
    const { filename, size } = req.file;
    try {
      await this.uploadUseCase.execute(Number(id), {
        avatar: {
          name: filename,
          size,
          url: filename,
        },
      });
      return res.status(200).json({ success: true });
    } catch (e) {
      throw new AvatarUploadError([e.message], e.statusCode);
    }
  }
}

// Avatar was uploaded in disk - didn't have an url
