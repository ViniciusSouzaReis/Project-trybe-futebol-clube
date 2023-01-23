import TeamsModel from '../database/models/Team.Model';

class TeamService {
  constructor(private _teamInfo = TeamsModel) {}

  async findAllTeams() {
    const getAll = await this._teamInfo.findAll();
    return getAll;
  }

  async findOneTeam(id: number) {
    const result = await this._teamInfo.findOne({ where: { id } });
    return result;
  }
}

export default TeamService;
