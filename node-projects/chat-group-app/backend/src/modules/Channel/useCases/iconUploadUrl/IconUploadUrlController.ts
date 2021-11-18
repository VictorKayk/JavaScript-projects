import { Request, Response } from 'express';

// Use case
import IconUploadUrlUseCase from './IconUploadUrlUseCase';

// Error
import IconUploadError from '../../errors/IconUploadError';

export default class IconController {
  constructor(private iconUploadUrlUseCase: IconUploadUrlUseCase) {}

  async handle(req: Request, res: Response) {
    const { userID } = req.user;
    const { id } = req.params;
    const { url } = req.body;
    try {
      await this.iconUploadUrlUseCase.execute(userID, { channelID: Number(id), icon: { url } });
      return res.status(200).json({ success: true });
    } catch (e) {
      throw new IconUploadError([e.message], e.statusCode);
    }
  }
}

