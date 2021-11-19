import { Request, Response } from 'express';

// Use case
import Get10ChannelsUseCase from './Get10ChannelsUseCase';

// Error
import Get10ChannelsError from '../../errors/Get10ChannelsError';

export default class Get10ChannelsController {
  constructor(private get10ChannelsUseCase: Get10ChannelsUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const channels = await this.get10ChannelsUseCase.execute();
      return res.status(200).json({ success: true, channels });
    } catch(e) {
      throw new Get10ChannelsError([e.message], e.statusCode);
    }
  }
}
