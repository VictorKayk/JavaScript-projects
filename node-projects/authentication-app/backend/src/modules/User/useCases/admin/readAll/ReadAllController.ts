import { Request, Response } from 'express';

// Use case
import ReadAllUseCase from './ReadAllUseCase';

// Error
import AdminError from '../../../errors/AdminError';

export default class ReadAllController {
  constructor(private readAllUseCase: ReadAllUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const admins = await this.readAllUseCase.execute();
      return res.status(200).json({ success: true, admins });
    } catch (e) {
      throw new AdminError([e.message], e.statusCode);
    }
  }
}
