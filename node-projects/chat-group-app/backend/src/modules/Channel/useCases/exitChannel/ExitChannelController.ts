import { Request, Response } from 'express';

// Use case
import ExitChannelUseCase from './ExitChannelUseCase';

// Error
import ExitChannelError from '../../errors/ExitChannelError';

export default class ExitChannel {
  constructor(private ExitChannelUseCase: ExitChannelUseCase) {}

  async handle(req: Request, res: Response) {
    const { userID } = req.user;
    const { channelID } = req.params;
    try {
      await this.ExitChannelUseCase.execute(Number(userID), Number(channelID));
      return res.status(200).json({ success: true });
    } catch (e) {
      throw new ExitChannelError([e.message], e.statusCode);
    }
  }
}

