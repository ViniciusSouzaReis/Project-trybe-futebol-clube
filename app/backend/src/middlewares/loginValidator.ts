import { Request, Response, NextFunction } from 'express';

const validateEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const validation = validateEmail.test(email);
  if (validation === false || password.length < 6) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  return next();
};

export default loginValidator;
