import { Request, Response, NextFunction } from 'express';

// Repository
import UserRepository from '../../modules/User/repositories/implementations/UserRepository';

// Error
import AuthorizationError from '../../modules/User/errors/AuthorizationError';

export default function userIs(roles: String[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    roles = roles.map((role) =>  role.toUpperCase());

    const { id } = req.user;
    try {
      const userRole = await UserRepository.getUserRoles(Number(id));
      if (!roles.includes(userRole)) throw new AuthorizationError(['You do not have the authorization to access this page.'], 401);
  
      return next();
    } catch (e) {
      throw new AuthorizationError();
    }
  }
}
