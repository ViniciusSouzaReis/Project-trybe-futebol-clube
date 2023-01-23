import * as bcrypt from 'bcryptjs';

const criptPassword = (password: string) => bcrypt.hashSync(password, 10);

export default criptPassword;
