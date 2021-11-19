import { Request, Response } from 'express';

// Use case
import DeleteChannelUseCase from './DeleteChannelUseCase';

// Error
import DeleteChannelError from '../../errors/DeleteChannelError';

export default class DeleteChannelController {
  constructor(private deleteChannelUseCase: DeleteChannelUseCase) {}

  async handle(req: Request, res: Response) {
    const { userID } = req.user
    const { channelID } = req.params;
    try {
      await this.deleteChannelUseCase.execute(Number(userID), Number(channelID))
      return res.status(201).json({ success: true });
    } catch(e) {
      throw new DeleteChannelError([e.message], e.statusCode);
    }
  }
}
