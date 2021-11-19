import { Request, Response } from 'express';

// Use case
import IconUploadUrlUseCase from './RemoveIconUseCase';

// Error
import RemoveIconError from '../../errors/RemoveIconError';

export default class IconController {
  constructor(private iconUploadUrlUseCase: IconUploadUrlUseCase) {}

  async handle(req: Request, res: Response) {
    const { userID } = req.user;
    const { channelID } = req.params;
    const { url } = req.body;
    try {
      await this.iconUploadUrlUseCase.execute(userID, { channelID: Number(channelID), icon: { url } });
      return res.status(200).json({ success: true });
    } catch (e) {
      throw new RemoveIconError([e.message], e.statusCode);
    }
  }
}

