import { Request, Response } from 'express';

// Use case
import IconUploadUseCase from './IconUploadUseCase';

// Error
import IconUploadError from '../../errors/IconUploadError';

export default class IconController {
  constructor(private iconUploadUseCase: IconUploadUseCase) {}

  async handle(req: Request, res: Response) {
    const { userID } = req.user;
    const { filename, size } = req.file;
    const { id } = req.params
    try {
      await this.iconUploadUseCase.execute(userID, { channelID: Number(id), icon:{ name: filename, size, url: filename }});
      return res.status(200).json({ success: true });
    } catch (e) {
      throw new IconUploadError([e.message], e.statusCode);
    }
  }
}

// Icon was uploaded in disk - didn't have an url
