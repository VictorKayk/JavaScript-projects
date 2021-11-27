import { Request, Response, NextFunction } from 'express';

// Repository
import UserRepository from '../../modules/User/repositories/implementations/UserRepository';

// Error
import AuthorizationError from '../../modules/User/errors/AuthorizationError';

export default async function isAdmin(req: Request, res: Response, next: NextFunction) {
  const { id } = req.user;
  try {
    const isAdmin = await UserRepository.isAdmin(Number(id));
    if (!isAdmin) throw new AuthorizationError(['You must be a admin to access this page.'], 401);

    return next();
  } catch (e) {
    throw new AuthorizationError();
  }
}
