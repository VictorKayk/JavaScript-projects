import { Request, Response } from 'express';

// Errors
import AppError from '../errors/AppError';

export default function errorHandling(err, req: Request, res: Response, _) {
  if (err instanceof AppError) { return res.status(err.statusCode).json({ errors: err.message }); }

  return res
    .status(500)
    .json({ msg: `Internal server error - ${err.message}` });
}
