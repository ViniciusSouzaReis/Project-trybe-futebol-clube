import MatchModel from '../database/models/Match.Model';
import TeamsModel from '../database/models/Team.Model';

class MatchService {
  constructor(private _matchInfo = MatchModel) {}

  async findAllMatches() {
    const getAll = await this._matchInfo.findAll({
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] },
        },
        { model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] },
        },
      ],
    });
    return getAll;
  }
}

export default MatchService;
