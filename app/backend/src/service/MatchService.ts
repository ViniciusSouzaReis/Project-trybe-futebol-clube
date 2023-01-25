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

  async findAllTeams() {
    const result = await this._teamInfo.findAll();
    return result;
  }

  async createMatch(info: NewMatch) {
    const allteams = await this.findAllTeams();
    const homeTeam = allteams.filter((team) => team.id === info.homeTeamId);
    const awayTeam = allteams.filter((team) => team.id === info.awayTeamId);

    if (homeTeam.length === 0 || awayTeam.length === 0) {
      return ({ status: 404, message: { message: 'There is no team with such id!' } });
    }
    const createNewMatch = await this._matchInfo.create({
      homeTeamId: info.homeTeamId,
      awayTeamId: info.awayTeamId,
      homeTeamGoals: info.homeTeamGoals,
      awayTeamGoals: info.awayTeamGoals,
      inProgress: true,
    });

    return { status: 201, message: createNewMatch };
  }

  async finishMatch(id: number) {
    await this._matchInfo.update({ inProgress: false }, { where: { id } });
  }
}

export default MatchService;
