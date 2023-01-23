import { RequestHandler } from 'express';
import LoginService from '../service/LoginService';

class LoginController {
  constructor(private _serviceLogin = new LoginService()) {}

  login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;

    const serviceReturn = await this._serviceLogin.login({ email, password });
    const { token } = serviceReturn;

    if (serviceReturn.error) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    return res.status(200).json({ token });
  };

  checkRole: RequestHandler = async (req, res) => {
    const bodyUser = req.body.user;
    const serviceReturn = await this._serviceLogin.findUser(bodyUser);

    return res.status(200).json({ role: serviceReturn });
  };
}

export default LoginController;
