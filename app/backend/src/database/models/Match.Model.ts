import { DataTypes, Model } from 'sequelize';
import connection from '.';
import TeamsModel from './Team.Model';

class MatchModel extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

MatchModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  homeTeamId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'home_team_goals',
  },
  awayTeamId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'away_team_goals',
  },
  inProgress: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'in_progress',
  },
}, { sequelize: connection, underscored: true, tableName: 'matches', timestamps: false });

MatchModel.belongsTo(TeamsModel);

TeamsModel.hasMany(MatchModel, { foreignKey: 'homeTeamId', as: 'hometeam' });
TeamsModel.hasMany(MatchModel, { foreignKey: 'awayTeamId', as: 'awayteam' });

export default MatchModel;
