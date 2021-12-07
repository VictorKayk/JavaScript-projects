import { Request, Response } from 'express';

// Use case
import AddUseCase from './AddUseCase';

// Error
import ModeratorError from '../../../errors/ModeratorError';

export default class AddController {
  constructor(private addUseCase: AddUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await this.addUseCase.execute(Number(id));
      return res.status(200).json({ success: true });
    } catch (e) {
      throw new ModeratorError([e.message], e.statusCode);
    }
  }
}
