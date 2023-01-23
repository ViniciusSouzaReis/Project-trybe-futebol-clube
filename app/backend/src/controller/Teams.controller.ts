import { RequestHandler } from 'express';
import TeamService from '../service/TeamService';

class TeamsController {
  constructor(private _serviceTeams = new TeamService()) {}

  getAll: RequestHandler = async (_req, res) => {
    const serviceReturn = await this._serviceTeams.findAllTeams();

    return res.status(200).json(serviceReturn);
  };

  findOneTeam: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const serviceReturn = await this._serviceTeams.findOneTeam(Number(id));

    return res.status(200).json(serviceReturn);
  };
}

export default TeamsController;
