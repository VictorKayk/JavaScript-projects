import { Request, Response } from 'express';

// Use case
import RemoveUseCase from './RemoveUseCase';

// Error
import ModeratorError from '../../../errors/ModeratorError';

export default class RemoveController {
  constructor(private removeUseCase: RemoveUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await this.removeUseCase.execute(Number(id));
      return res.status(200).json({ success: true });
    } catch (e) {
      throw new ModeratorError([e.message], e.statusCode);
    }
  }
}
