import { Request, Response } from 'express';

// Use case
import UserProfileUseCase from './UserProfileUseCase';

// Errors
import UserProfileError from '../../../../errors/userErrors/UserProfileError';

export default class UserProfileController {
  constructor(private userProfileUseCase: UserProfileUseCase) {}

  async handle(req: Request, res: Response) {
    const { userId } = req.user;
    try {
      const user = await this.userProfileUseCase.execute(userId);
      return res.status(200).json({ success: true, user });
    } catch (e) {
      throw new UserProfileError([e.message], e.statusCode);
    }
  }
}
