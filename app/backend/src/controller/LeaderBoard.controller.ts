import { RequestHandler } from 'express';
import LeaderBoardService from '../service/LeaderBoardService';

class LeaderBoardController {
  constructor(private _leaderboardService = new LeaderBoardService()) {}

  getHomeLeaderBoard: RequestHandler = async (req, res) => {
    const homeLeaderBoard = await this._leaderboardService.createLeaderBoardHome();
    return res.status(200).json(homeLeaderBoard);
  };
}

export default LeaderBoardController;
