import { Request, Response } from 'express';

// Use case
import GetAllUseCase from './GetAllUseCase';

// Error
import GetAllError from '../../errors/GetAllError';

export default class GetAllController {
  constructor(private getAllUseCase: GetAllUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const users = await this.getAllUseCase.execute();
      return res.status(200).json({ success: true, users });
    } catch (e) {
      throw new GetAllError([e.message], e.statusCode);
    }
  }
}
