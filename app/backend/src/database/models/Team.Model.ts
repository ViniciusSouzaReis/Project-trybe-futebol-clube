import { DataTypes, Model } from 'sequelize';
import connection from '.';
import MatchModel from './Match.Model';

class TeamsModel extends Model {
  declare id: number;
  declare teamName: string;
}

TeamsModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.NUMBER,
  },
  teamName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'team_name',
  },
}, { sequelize: connection, underscored: true, tableName: 'teams', timestamps: false });

MatchModel.belongsTo(TeamsModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
MatchModel.belongsTo(TeamsModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

TeamsModel.hasMany(MatchModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
TeamsModel.hasMany(MatchModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default TeamsModel;
