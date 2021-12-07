import { Request, Response, NextFunction } from 'express';
import { Permissions } from '.prisma/client';

// Validate
import validate from '../validations/permission';

// Error
import AuthorizationError from '../../modules/User/errors/AuthorizationError';

function permitted(permissions: Permissions[], userPermissions: Permissions[]) {
  return permissions.every((el) => userPermissions.indexOf(el) > -1);
}

function validatePermissions(permissions: Permissions[]) {
  const valid = validate({ permissions });
  if (valid !== true) throw new AuthorizationError(valid, 400);
}

export default function permissionsRequired(permissions: Permissions[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    validatePermissions(permissions);

    const { role, permissions: userPermissions } = req.user;

    if (role !== 'user') return next();

    if (!permitted(permissions, userPermissions)) throw new AuthorizationError(['You do not have the authorization to access this page.'], 401);

    return next();
  };
}
