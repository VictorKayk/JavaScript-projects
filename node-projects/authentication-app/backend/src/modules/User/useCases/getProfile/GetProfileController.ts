import { Request, Response } from 'express';

// Use case
import GetProfileUseCase from './GetProfileUseCase';

// Errors
import GetProfileError from '../../errors/GetProfileError';

export default class GetProfileController {
  constructor(private getProfileUseCase: GetProfileUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.user;
    try {
      const user = await this.getProfileUseCase.execute(Number(id));
      return res.status(200).json({ success: true, user });
    } catch (e) {
      throw new GetProfileError([e.message], e.statusCode);
    }
  }
}
