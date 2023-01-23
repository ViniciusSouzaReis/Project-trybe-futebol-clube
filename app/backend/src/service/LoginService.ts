import * as bcrypt from 'bcryptjs';
import criptPassword from '../auth/criptPassword';
import UserModel from '../database/models/User.Model';
import JWT from '../auth/JWT';
import { Login } from '../interfaces/Login.interface';

class LoginService {
  protected _jwt = new JWT();

  constructor(private _userInfo = UserModel) {}

  async login({ email, password }: Login) {
    const newLogin = await this._userInfo.findOne({ where: { email } });
    const cript = criptPassword(password);
    if (!newLogin || !bcrypt.compareSync(password, newLogin.password)) {
      return { error: true };
    }
    const token = this._jwt.generateToken({ email, password: cript });
    return { error: false, token };
  }

  async findUser({ email }: Login) {
    const result = await this._userInfo.findOne({ where: { email } });
    return result?.role;
  }
}

export default LoginService;
