import { Request, Response, NextFunction } from 'express';

// Repository
import UserRepository from '../../modules/User/repositories/implementations/UserRepository';

// Error
import AuthorizationError from '../../modules/User/errors/AuthorizationError';

export default async function isModerator(req: Request, res: Response, next: NextFunction) {
  const { id } = req.user;
  try {
    const isModerator = await UserRepository.isModerator(Number(id));
    if (!isModerator) throw new AuthorizationError(['You must be a moderator to access this page.'], 401);

    return next();
  } catch (e) {
    throw new AuthorizationError();
  }
}
