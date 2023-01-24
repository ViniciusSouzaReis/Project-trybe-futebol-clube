import { RequestHandler } from 'express';
import MatchService from '../service/MatchService';

class MatchesController {
  constructor(private _serviceMatches = new MatchService()) {}

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

    const serviceReturn = await this._serviceMatches.findAllMatches();
    return res.status(200).json(serviceReturn);
  };
}

export default MatchesController;
