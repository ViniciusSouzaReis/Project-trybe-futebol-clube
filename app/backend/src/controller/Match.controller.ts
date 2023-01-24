import { RequestHandler } from 'express';
import MatchService from '../service/MatchService';

class MatchesController {
  constructor(private _serviceMatches = new MatchService()) {}

  getAll: RequestHandler = async (req, res) => {
    const { inProgress } = req.query;

    if (inProgress === 'true') {
      const searchAll = await this._serviceMatches.findAllMatches();
      const filterDataInProgress = searchAll.filter((match) => match.inProgress === true);
      res.status(200).json(filterDataInProgress);
    }

    if (inProgress === 'false') {
      const searchAll = await this._serviceMatches.findAllMatches();
      const filterDataFinished = searchAll.filter((match) => match.inProgress === false);
      res.status(200).json(filterDataFinished);
    }

    const serviceReturn = await this._serviceMatches.findAllMatches();
    return res.status(200).json(serviceReturn);
  };
}

export default MatchesController;
