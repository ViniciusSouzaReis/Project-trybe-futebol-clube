import { RequestHandler } from 'express';
import MatchService from '../service/MatchService';
// import JWT from '../auth/JWT';

class MatchesController {
  constructor(
    private _serviceMatches = new MatchService(),
    // private _jwt = new JWT(),
    // for lint
  ) {}

  getAll: RequestHandler = async (req, res) => {
    const { inProgress } = req.query;

    if (inProgress === 'true') {
      const searchMatchInProgress = await this._serviceMatches.matchesInProgress();
      res.status(200).json(searchMatchInProgress);
    }

    if (inProgress === 'false') {
      const searchMatchFinished = await this._serviceMatches.finishedMatches();
      res.status(200).json(searchMatchFinished);
    }

    if (!inProgress) {
      const serviceReturn = await this._serviceMatches.findAllMatches();
      return res.status(200).json(serviceReturn);
    }
  };

  createMatch: RequestHandler = async (req, res) => {
    const { body } = req;

    if (body.homeTeamId === body.awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    const { status, message } = await this._serviceMatches.createMatch(body);
    return res.status(status).json(message);
  };

  finishMatch: RequestHandler = async (req, res) => {
    const { id } = req.params;

    await this._serviceMatches.finishMatch(Number(id));

    return res.status(200).json({ message: 'Finished' });
  };
}

export default MatchesController;
