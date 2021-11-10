import { Request, Response } from 'express';

// Use case
import GithubLoginUseCase from './GithubLoginUseCase';

// Errors
import GithubLoginError from '../../../../errors/userErrors/GithubLoginError';

export class GithubLogin {
  handle(req: Request, res: Response) {
    return res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
    );
  }
}

export class GithubLoginAuth {
  constructor(private githubLoginUseCase: GithubLoginUseCase) {}

  async handle(req: Request, res: Response) {
    const { code } = req.query;

    if (!code) throw new GithubLoginError(["Code doesn't provider."]);
    try {
      const token = this.githubLoginUseCase.execute(code);
      return res.status(201).json({ success: true, token });
    } catch (e) {
      throw new GithubLoginError([e.message]);
    }
  }
}
