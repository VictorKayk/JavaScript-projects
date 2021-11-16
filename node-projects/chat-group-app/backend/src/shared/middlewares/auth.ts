import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

// Error
import AuthorizationError from '../../modules/User/errors/AuthorizationError';

// Interface
interface IPayload {
  sub: string;
}

class Auth {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization)
      throw new AuthorizationError(['Authorization required.']);

    const [, token] = authorization.split(' ');
    if (!token) throw new AuthorizationError(['Token required.']);

    try {
      const { sub: userID } = verify(token, process.env.JWT_SECRET) as IPayload;
      req.user = { userID };
      next();
    } catch (e) {
      throw new AuthorizationError(undefined, 500);
    }
  }
}

export default new Auth();
