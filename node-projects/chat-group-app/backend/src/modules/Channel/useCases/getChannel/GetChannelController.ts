import { Request, Response } from 'express';

// Use case
import GetChannelUseCase from './GetChannelUseCase';

// Error
import GetChannelError from '../../errors/GetChannelError';

export default class GetChannelController {
  constructor(private getChannelUseCase: GetChannelUseCase) {}

  async handle(req: Request, res: Response) {
    const { userID } = req.user
    const { channelID } = req.params;
    try {
      const channel = await this.getChannelUseCase.execute(userID, Number(channelID));
      return res.status(200).json({ success: true, channel });
    } catch(e) {
      throw new GetChannelError([e.message], e.statusCode);
    }
  }
}
