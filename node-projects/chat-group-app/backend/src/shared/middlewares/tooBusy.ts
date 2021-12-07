import { Request, Response, NextFunction } from 'express';
import toobusy from 'toobusy-js';

export default function tooBusy(eq: Request, res: Response, next: NextFunction) {
  if (toobusy()) return res.status(403).json({ msg: 'Sorry!!! The server is too busy now :(. Please try again later.' });
  next();
}
