import { DataTypes, Model } from 'sequelize';
import connection from '.';

class MatchModel extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
  declare inProgress: boolean;
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

export default MatchModel;
