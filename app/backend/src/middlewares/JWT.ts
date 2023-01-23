import * as jwt from 'jsonwebtoken';
import { Secret, SignOptions } from 'jsonwebtoken';
import { Login } from '../interfaces/Login.interface';

export default class JWT {
  private _secretKey: Secret = process.env.JWT_SECRET || 'jwt_secret';
  private _jwtConfig: SignOptions = { expiresIn: '7d', algorithm: 'HS256' };

  public generateToken(login: Login) {
    const token = jwt.sign({ ...login }, this._secretKey, this._jwtConfig);
    return token;
  }

  public checkToken(token: string) {
    const decoded = jwt.verify(token, this._secretKey);
    return decoded;
  }
}
