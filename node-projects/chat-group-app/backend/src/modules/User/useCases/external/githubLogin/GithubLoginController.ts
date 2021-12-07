import { Request, Response } from 'express';

// Use case
import GithubLoginUseCase from './GithubLoginUseCase';

// Errors
import GithubLoginError from '../../../errors/GithubLoginError';

export default class GithubLoginAuth {
  constructor(private githubLoginUseCase: GithubLoginUseCase) {}

  async handle(req: Request, res: Response) {
    const {
      id, _json: {
        name, email, bio, avatar_url,
      },
    } = req.user;
    try {
      const token = await this.githubLoginUseCase.execute({
        id: Number(id), name, email, bio, avatar_url,
      });
      return res.status(200).json({ success: true, token });
    } catch (e) {
      throw new GithubLoginError([e.message], e.statusCode);
    }
  }
}
