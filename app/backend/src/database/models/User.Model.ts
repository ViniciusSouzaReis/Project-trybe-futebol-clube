import { DataTypes, Model } from 'sequelize';
import connection from '.';

class UserModel extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

UserModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'username',
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'role',
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'email',
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'password',
  },
}, { sequelize: connection, tableName: 'users', timestamps: false });

export default UserModel;
