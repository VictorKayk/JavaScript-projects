import { Request, Response } from 'express';

// Use case
import CreateChannelUseCase from './CreateChannelUseCase';

// Interfaces
import ICreateChannel from '../../interfaces/ICreateChannel';

// Error
import CreateChannelError from '../../errors/CreateChannelError';

export default class CreateChannelController {
  constructor(private createChannelUseCase: CreateChannelUseCase) {}

  async handle(req: Request, res: Response) {
    const { userID } = req.user
    const { name, description }: ICreateChannel = req.body;
    try {
      await this.createChannelUseCase.execute({ userID, name, description })
      return res.status(201).json({ success: true });
    } catch(e) {
      throw new CreateChannelError([e.message], e.statusCode);
    }
  }
}
