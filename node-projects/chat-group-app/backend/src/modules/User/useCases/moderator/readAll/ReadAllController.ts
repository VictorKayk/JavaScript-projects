import { Request, Response } from 'express';

// Use case
import ReadAllUseCase from './ReadAllUseCase';

// Error
import ModeratorError from '../../../errors/ModeratorError';

export default class ReadAllController {
  constructor(private readAllUseCase: ReadAllUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const moderators = await this.readAllUseCase.execute();
      return res.status(200).json({ success: true, moderators });
    } catch (e) {
      throw new ModeratorError([e.message], e.statusCode);
    }
  }
}
