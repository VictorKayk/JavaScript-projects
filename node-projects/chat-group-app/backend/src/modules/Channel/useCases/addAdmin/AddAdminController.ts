import { Request, Response } from 'express';

// Use case
import AddAdminUseCase from './AddAdminUseCase';

// Error
import AddAdminError from '../../errors/AddAdminError';

export default class AddAdminController {
  constructor(private addAdminUseCase: AddAdminUseCase) {}

  async handle(req: Request, res: Response) {
    const { userID } = req.user
    const { channelID, adminID } = req.params;
    try {
      await this.addAdminUseCase.execute(userID, Number(channelID), Number(adminID));
      return res.status(200).json({ success: true });
    } catch(e) {
      throw new AddAdminError([e.message], e.statusCode);
    }
  }
}
