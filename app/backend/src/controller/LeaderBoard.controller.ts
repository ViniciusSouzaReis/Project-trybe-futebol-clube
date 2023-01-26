import { RequestHandler } from 'express';
import LeaderBoardService from '../service/LeaderBoardService';

class LeaderBoardController {
  constructor(private _leaderboardService = new LeaderBoardService()) {}

  getHomeLeaderBoard: RequestHandler = async (_req, res) => {
    const homeLeaderBoard = await this._leaderboardService.createLeaderBoardHome();
    return res.status(200).json(homeLeaderBoard);
  };

  getAwayLeaderBoard: RequestHandler = async (_req, res) => {
    const awayLeaderBoard = await this._leaderboardService.createLeaderBoardAway();
    return res.status(200).json(awayLeaderBoard);
  };
}

export default LeaderBoardController;
