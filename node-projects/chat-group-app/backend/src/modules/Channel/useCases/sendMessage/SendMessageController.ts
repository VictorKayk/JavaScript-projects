import { Request, Response } from 'express';

// Use case
import SendMessageUseCase from './SendMessageUseCase';

// Error
import SendMessageError from '../../errors/SendMessageError';

export default class SendMessage {
  constructor(private sendMessageUseCase: SendMessageUseCase) {}

  async handle(req: Request, res: Response) {
    const { userID } = req.user;
    const { channelID } = req.params;
    const { message } = req.body;
    try {
      await this.sendMessageUseCase.execute(Number(userID), Number(channelID), message);
      return res.status(200).json({ success: true });
    } catch (e) {
      throw new SendMessageError([e.message], e.statusCode);
    }
  }
}

