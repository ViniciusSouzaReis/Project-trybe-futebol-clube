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

  async matchesInProgress() {
    const getAll = await this.findAllMatches();
    const filterMatchInProgress = getAll.filter((match) => match.inProgress === true);
    return filterMatchInProgress;
  }

  async finishedMatches() {
    const getAll = await this.findAllMatches();
    const filterMatchFinished = getAll.filter((match) => match.inProgress === false);
    return filterMatchFinished;
  }
}

export default MatchService;
