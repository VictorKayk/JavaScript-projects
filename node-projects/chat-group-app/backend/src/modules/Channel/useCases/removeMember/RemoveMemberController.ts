import { Request, Response } from 'express';

// Use case
import RemoveMemberUseCase from './RemoveMemberUseCase';

// Error
import RemoveMemberError from '../../errors/RemoveMemberError';

export default class RemoveMemberController {
  constructor(private removeMemberUseCase: RemoveMemberUseCase) {}

  async handle(req: Request, res: Response) {
    const { userID } = req.user
    const { channelID, memberID } = req.params;
    try {
      await this.removeMemberUseCase.execute(userID, Number(channelID), Number(memberID));
      return res.status(200).json({ success: true });
    } catch(e) {
      throw new RemoveMemberError([e.message], e.statusCode);
    }
  }
}
