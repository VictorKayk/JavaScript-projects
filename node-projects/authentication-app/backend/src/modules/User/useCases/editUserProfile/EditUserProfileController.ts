import { Request, Response } from 'express';

// Use case
import EditUserProfileUseCase from './EditUserProfileUseCase';

// Errors
import EditUserProfileError from '../../../../errors/userErrors/EditUserProfileError';

export default class UserInfosController {
  constructor(private editUserProfileUseCase: EditUserProfileUseCase) {}

  async handle(req: Request, res: Response) {
    const { userId } = req.user;
    const { name, email, password, avatar, bio, phone } = req.body;
    try {
      const token = await this.editUserProfileUseCase.execute(userId, { name, email, password, avatar, bio, phone });
      return res.status(200).json({ success: true, token });
    } catch (e) {
      throw new EditUserProfileError([e.message], e.statusCode);
    }
  }
}
