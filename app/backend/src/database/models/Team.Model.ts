import { DataTypes, Model } from 'sequelize';
import connection from '.';

class TeamsModel extends Model {
  declare id: number;
  declare teamName: string;
}

TeamsModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'team_name',
  },
}, { sequelize: connection, underscored: true, tableName: 'teams', timestamps: false });

export default TeamsModel;
