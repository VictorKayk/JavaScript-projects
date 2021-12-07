import { Request, Response } from 'express';

// Use case
import UpdateProfileUseCase from './UpdateProfileUseCase';

// Errors
import UpdateProfileError from '../../errors/UpdateProfileError';

export default class UpdateProfileController {
  constructor(private updateProfileUseCase: UpdateProfileUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.user;
    const {
      name, email, password, bio, phone,
    } = req.body;
    try {
      await this.updateProfileUseCase.execute(Number(id), {
        name, email, password, bio, phone,
      });
      return res.status(200).json({ success: true });
    } catch (e) {
      throw new UpdateProfileError([e.message], e.statusCode);
    }
  }
}
