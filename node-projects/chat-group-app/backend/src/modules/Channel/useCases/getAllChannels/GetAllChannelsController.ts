import { Request, Response } from 'express';

// Use case
import GetAllChannelsUseCase from './GetAllChannelsUseCase';

// Error
import GetAllChannelsError from '../../errors/GetAllChannelsError';

export default class GetAllChannelsController {
  constructor(private getAllChannelsUseCase: GetAllChannelsUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const channels = await this.getAllChannelsUseCase.execute();
      return res.status(200).json({ success: true, channels });
    } catch(e) {
      throw new GetAllChannelsError([e.message], e.statusCode);
    }
  }
}
