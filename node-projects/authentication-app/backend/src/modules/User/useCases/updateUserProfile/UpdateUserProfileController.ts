import { Request, Response } from 'express';

// Use case
import UpdateUserProfileUseCase from './UpdateUserProfileUseCase';

// Errors
import UpdateUserProfileError from '../../errors/UpdateUserProfileError';

export default class UpdateUserProfileController {
  constructor(private updateUserProfileUseCase: UpdateUserProfileUseCase) {}

  async handle(req: Request, res: Response) {
    const { userId } = req.user;
    const { name, email, password, bio, phone } = req.body;
    try {
      const token = await this.updateUserProfileUseCase.execute(userId, { name, email, password, bio, phone });
      return res.status(200).json({ success: true, token });
    } catch (e) {
      throw new UpdateUserProfileError([e.message], e.statusCode);
    }
  }
}
