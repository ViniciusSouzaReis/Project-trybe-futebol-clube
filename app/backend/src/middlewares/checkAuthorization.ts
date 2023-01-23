import { Request, Response, NextFunction } from 'express';
import JWT from '../auth/JWT';

const jwt = new JWT();

const checkAuthorization = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({ message: 'Token not found' });
  }
  const decoded = jwt.checkToken(token);

  req.body.user = decoded;
  return next();
};

export default checkAuthorization;
