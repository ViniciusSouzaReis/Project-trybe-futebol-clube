import { NewMatch } from '../interfaces/Match.interface';
import MatchModel from '../database/models/Match.Model';
import TeamsModel from '../database/models/Team.Model';

class MatchService {
  constructor(private _matchInfo = MatchModel, private _teamInfo = TeamsModel) {}

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

  async findOneTeam(id: number) {
    const result = await this._teamInfo.findOne({ where: { id } });
    return result;
  }

  async createMatch(info: NewMatch) {
    const homeTeam = await this.findOneTeam(info.homeTeamId);
    const awayTeam = await this.findOneTeam(info.awayTeamId);

    if (!homeTeam || !awayTeam) {
      return ({ status: 404, message: { message: 'There is no team with such id!' } });
    }
    const createNewMatch = await this._matchInfo.create({
      homeTeamId: info.homeTeamId,
      awayTeamId: info.awayTeamId,
      homeTeamGoals: info.homeTeamGoals,
      awayTeamGoals: info.awayTeamGoals,
      inProgress: true,
    });

    return { status: 200, message: createNewMatch };
  }

  async finishMatch(id: number) {
    await this._matchInfo.update({ inProgress: false }, { where: { id } });
  }
}

export default MatchService;
