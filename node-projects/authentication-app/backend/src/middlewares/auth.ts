import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

// Error
import AuthorizationError from '../errors/userErrors/AuthorizationError';

// Interface
import IPayload from '../interfaces/IPayload';

class Auth {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization)
      throw new AuthorizationError(['Authorization required.']);

    const [, token] = authorization.split(' ');
    if (!token) throw new AuthorizationError(['Token required.']);

    try {
      const { sub: userId } = verify(token, process.env.JWT_SECRET) as IPayload;
      req.user = { userId };
      next();
    } catch (e) {
      throw new AuthorizationError(undefined, 500);
    }
  }
}

export default new Auth();
