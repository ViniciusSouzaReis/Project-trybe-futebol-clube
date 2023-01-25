import { Request, Response } from 'express';
import LeaderBoardService from '../service/LeaderBoardService';

const leaderBoard = async (req: Request, res: Response) => {
  const result = await LeaderBoardService.createLeaderBoardHome();
  return res.status(200).json(result);
};

export default {
  leaderBoard,
};
