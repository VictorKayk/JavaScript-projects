import { Request, Response, NextFunction } from 'express';

// Error
import AuthorizationError from '../../modules/User/errors/AuthorizationError';

export default function userIs(roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;
    try {
      roles = roles.map((item) => item.toLowerCase());
      if (!roles.includes(role)) throw new AuthorizationError(['You do not have the authorization to access this page.'], 401);

      return next();
    } catch (e) {
      throw new AuthorizationError([e.message], e.statusCode);
    }
  };
}
