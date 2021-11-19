import { Request, Response } from 'express';

// Use case
import RemoveAdminUseCase from './RemoveAdminUseCase';

// Error
import RemoveAdminError from '../../errors/RemoveAdminError';

export default class RemoveAdminController {
  constructor(private removeAdminUseCase: RemoveAdminUseCase) {}

  async handle(req: Request, res: Response) {
    const { userID } = req.user
    const { channelID, adminID } = req.params;
    try {
      await this.removeAdminUseCase.execute(userID, Number(channelID), Number(adminID));
      return res.status(200).json({ success: true });
    } catch(e) {
      throw new RemoveAdminError([e.message], e.statusCode);
    }
  }
}
