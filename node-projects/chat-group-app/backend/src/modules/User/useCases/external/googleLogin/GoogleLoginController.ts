import { Request, Response } from 'express';

// Use case
import GoogleLoginUseCase from './GoogleLoginUseCase';

// Error
import GoogleLoginError from '../../../errors/GoogleLoginError';

export default class GoogleLoginController {
  constructor(private googleLoginUseCase: GoogleLoginUseCase) {}

  async handle(req: Request, res: Response) {
    const { id, _json: { name, email, picture } } = req.user;
    try {
      const token = await this.googleLoginUseCase.execute({
        id: Number(id / 200), name, email, picture,
      });
      return res.status(200).json({ success: true, token });
    } catch (e) {
      throw new GoogleLoginError([e.message], e.statusCode);
    }
  }
}
